import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BillingHistoryService } from '../../Services/billing/billing-history.service';
import { BillingHistoryItem } from '../../Models/billings/billings';
import { DateRangePickerModalComponent } from '../../components/date-range-picker-modal/date-range-picker-modal.component';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DateRangePickerModalComponent],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit {
  billingData: BillingHistoryItem[] = [];
  loading = false;
  error = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  pageNumbers: number[] = [1];
  lastPageReached: boolean = false;

  serviceFilter: string = '';
  statusFilter: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  showDatePicker: boolean = false;

  constructor(private billingService: BillingHistoryService) {}

  ngOnInit() {
    this.fetchData(1);
  }

  fetchData(page: number) {
    this.loading = true;
    this.error = '';
    const params: any = {
      PageSize: this.itemsPerPage,
      PageNumber: page
    };
    if (this.serviceFilter) params.ServiceType = this.serviceFilter;
    if (this.statusFilter) {
      if (this.statusFilter === 'Paid') params.Paid = 1;
      else if (this.statusFilter === 'Unpaid') params.Paid = 0;
      else if (this.statusFilter === 'Rejected') params.Paid = 2; // adjust if needed
    }
    if (this.startDate) params.StartDate = this.startDate.toISOString().split('T')[0];
    if (this.endDate) params.EndDate = this.endDate.toISOString().split('T')[0];

    this.billingService.getBillingHistory(params).subscribe({
      next: (res) => {
        this.billingData = res.data || [];
        this.currentPage = page;
        if (this.billingData.length === this.itemsPerPage) {
          if (!this.pageNumbers.includes(page + 1)) {
            this.pageNumbers.push(page + 1);
          }
          this.lastPageReached = false;
        } else {
          this.lastPageReached = true;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data';
        this.billingData = [];
        this.loading = false;
      }
    });
  }

  goToPage(page: number) {
    if (page < 1) return;
    this.fetchData(page);
  }

  onFilterChange() {
    this.pageNumbers = [1];
    this.lastPageReached = false;
    this.fetchData(1);
  }

  onDateRangeApply(event: { start: Date | null, end: Date | null }) {
    this.startDate = event.start;
    this.endDate = event.end;
    this.showDatePicker = false;
    this.onFilterChange();
  }

  clearDateRange() {
    this.startDate = null;
    this.endDate = null;
    this.onFilterChange();
  }

  getSL(index: number): string {
    const sl = (this.itemsPerPage * (this.currentPage - 1)) + index + 1;
    return sl < 10 ? '0' + sl : String(sl);
  }

  getStatus(row: BillingHistoryItem): 'Unpaid' | 'Paid' | 'Rejected' {
    if (row.paid === 2 || row.r === 1) return 'Rejected';
    if (row.paid === 1) return 'Paid';
    return 'Unpaid';
  }

  getAction(row: BillingHistoryItem): 'GoForPayment' | 'Invoice' | 'InvoiceMethalk' | 'Regenerate' {
    const status = this.getStatus(row);
    if (status === 'Paid' && row.invoicE_NO && row.inV_DATE) {
      return 'InvoiceMethalk';
    } else if (status === 'Paid' && row.invoicE_NO) {
      return 'Invoice';
    } else if (status === 'Rejected') {
      return 'Regenerate';
    } else {
      return 'GoForPayment';
    }
  }

  goForPayment(row: BillingHistoryItem) {
    alert('Go for payment: ' + (row.invoicE_NO || row.quotationNo));
  }
  viewInvoice(row: BillingHistoryItem) {
    alert('View invoice: ' + (row.invoicE_NO || row.quotationNo));
  }
  methalk(row: BillingHistoryItem) {
    alert('Methalk for: ' + (row.invoicE_NO || row.quotationNo));
  }
  regenerate(row: BillingHistoryItem) {
    alert('Regenerate for: ' + (row.invoicE_NO || row.quotationNo));
  }
}
