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
  totalPages: number = 1;

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
      if (this.statusFilter === 'Paid') params.Paid = 'paid';
      else if (this.statusFilter === 'Unpaid') params.Paid = 'unpaid';
      else if (this.statusFilter === 'Pending Approval') params.Paid = 'pending';
    }
    if (this.startDate) params.StartDate = this.startDate.toISOString().split('T')[0];
    if (this.endDate) params.EndDate = this.endDate.toISOString().split('T')[0];

    this.billingService.getBillingHistory(params).subscribe({
      next: (res) => {
        this.billingData = (res.data && res.data.billingHistoryList) ? res.data.billingHistoryList : [];
        this.currentPage = page;
        let totalRecord = 0;
        if (this.billingData.length > 0 && this.billingData[0].totalRecords) {
          totalRecord = this.billingData[0].totalRecords;
        }
        this.totalPages = totalRecord ? Math.ceil(totalRecord / this.itemsPerPage) : 1;
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.lastPageReached = this.currentPage >= this.totalPages;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data';
        this.billingData = [];
        this.loading = false;
      }
    });
  }

  goToPage(page: number | string) {
    if (typeof page !== 'number' || page < 1) return;
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
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://corporate3.bdjobs.com/Job_Posting_PaymentDetails.asp';
    form.target = '_self';

    const inputId = document.createElement('input');
    inputId.type = 'hidden';
    inputId.name = 'hdInvoiceOrJobId';
    inputId.value = String(row.itemId);
    form.appendChild(inputId);

    // const inputValue = document.createElement('input');
    // inputValue.type = 'hidden';
    // inputValue.name = 'hdInvoiceOrJobValue';
    // inputValue.value = String(row.serviceName); 
    // form.appendChild(inputValue);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
  viewInvoice(row: BillingHistoryItem) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://corporate3.bdjobs.com/DownloadInvoice_init.asp';
    form.target = '_blank'; 

    const addField = (name: string, value: string | number | null) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value !== null && value !== undefined ? String(value) : '';
      form.appendChild(input);
    };

    addField('QID', row.quotationID);
    addField('hidInvoiceOrJobId', row.itemId);
    addField('hidServiceName', row.serviceName);
    addField('perJobVat', 0);
    addField('perJobPrice', 0);
    addField('invoiceId', row.invoiceId);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
  mushak(row: BillingHistoryItem) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://corporate3.bdjobs.com/DownloadMushok_Init.asp';
    form.target = '_blank';

    const addField = (name: string, value: string | number | null) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value !== null && value !== undefined ? String(value) : '';
      form.appendChild(input);
    };

    addField('QID', row.quotationID);
    addField('hidInvoiceOrJobId', row.itemId);
    addField('hidServiceName', row.serviceName);
    addField('perJobVat', 0);
    addField('perJobPrice', 0);
    addField('challanId', row.challanId !== undefined ? row.challanId : null);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
  regenerate(row: BillingHistoryItem) {
    alert('Regenerate for: ' + (row.invoicE_NO || row.quotationNo));
  }

  getTruncatedPageNumbers(): (number | string)[] {
    const totalPages = this.pageNumbers.length;
    const current = this.currentPage;
    const pages: (number | string)[] = [];

    // Always show first 3 pages
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(i);
    }

    // Show ellipsis if needed between 3 and current-1
    if (current > 5 && totalPages > 5) {
      pages.push('...');
    }

    // Show current-1, current, current+1 if in the middle
    for (let i = Math.max(4, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      if (!pages.includes(i) && i > 3 && i < totalPages) {
        pages.push(i);
      }
    }

    // Show ellipsis if needed between current+1 and last
    if (current < totalPages - 3 && totalPages > 5) {
      pages.push('...');
    }

    // Always show last page if not already included
    if (totalPages > 3) {
      pages.push(totalPages);
    }

    return pages;
  }

  isNumber(val: any): boolean {
    return typeof val === 'number';
  }
}
