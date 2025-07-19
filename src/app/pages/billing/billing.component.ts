import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BillingHistoryService } from '../../Services/billing/billing-history.service';

export interface BillingRow {
  sl: number;
  quotationNo: string;
  orderDate: string;
  service: string;
  amount: string;
  status: 'Unpaid' | 'Paid' | 'Rejected';
  invoiceNo: string;
  action: 'GoForPayment' | 'Invoice' | 'InvoiceMethalk' | 'Regenerate';
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit {
  billingData: BillingRow[] = [];
  loading = false;
  error = '';

  // Filters
  serviceFilter: string = '';
  statusFilter: string = '';
  startDate: string | null = null;
  endDate: string | null = null;
  showDatePicker = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  totalItems: number = 0;

  constructor(private billingService: BillingHistoryService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.error = '';
    this.billingService.getBillingHistory({
      StartDate: this.startDate || undefined,
      EndDate: this.endDate || undefined,
      ServiceType: this.serviceFilter || undefined,
      PageSize: this.itemsPerPage,
      PageNo: this.currentPage
    }).subscribe({
      next: (res) => {
        const apiData = res.data || [];
        // Map API data to BillingRow[]
        this.billingData = apiData.map((item: any, idx: number) => {
          // Determine status and action
          let status: 'Unpaid' | 'Paid' | 'Rejected' = 'Unpaid';
          if (item.paid === 1) status = 'Paid';
          // You may need to adjust this logic for 'Rejected'
          if (item.r === 1) status = 'Rejected';

          // Determine action
          let action: 'GoForPayment' | 'Invoice' | 'InvoiceMethalk' | 'Regenerate' = 'GoForPayment';
          if (status === 'Paid' && item.invoicE_NO && item.inV_DATE) {
            action = 'InvoiceMethalk';
          } else if (status === 'Paid' && item.invoicE_NO) {
            action = 'Invoice';
          } else if (status === 'Rejected') {
            action = 'Regenerate';
          } else {
            action = 'GoForPayment';
          }

          return {
            sl: (this.itemsPerPage * (this.currentPage - 1)) + idx + 1,
            quotationNo: item.quotationNo || '',
            orderDate: item.postedOn ? new Date(item.postedOn).toLocaleDateString() : '',
            service: item.serviceName || item.rtype || '',
            amount: item.totalAmount ? item.totalAmount + ' BDT' : '',
            status,
            invoiceNo: item.invoicE_NO || '',
            action
          };
        });
        // If API provides total count, use it. Otherwise, estimate.
        this.totalItems = res.totalCount || this.billingData.length;
        this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data';
        this.billingData = [];
        this.loading = false;
      }
    });
  }

  get paginatedData(): BillingRow[] {
    // Data is already paginated from API
    return this.billingData;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchData();
    }
  }

  setServiceFilter(service: string) {
    this.serviceFilter = service;
    this.currentPage = 1;
    this.fetchData();
  }

  setStatusFilter(status: string) {
    this.statusFilter = status;
    this.currentPage = 1;
    this.fetchData();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.fetchData();
  }

  goForPayment(row: BillingRow) {
    alert('Go for payment: ' + row.invoiceNo);
  }

  viewInvoice(row: BillingRow) {
    alert('View invoice: ' + row.invoiceNo);
  }

  methalk(row: BillingRow) {
    alert('Methalk for: ' + row.invoiceNo);
  }

  regenerate(row: BillingRow) {
    alert('Regenerate for: ' + row.invoiceNo);
  }

  openDatePicker() {
    this.showDatePicker = true;
  }

  closeDatePicker() {
    this.showDatePicker = false;
  }
}
