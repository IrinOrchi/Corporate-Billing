import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

const BILLING_DATA: BillingRow[] = [
  { sl: 1, quotationNo: '231972-29-35840-46', orderDate: '11 Dec 2023', service: 'SMS Package', amount: '200 BDT', status: 'Unpaid', invoiceNo: '2509-358407-0100-396481', action: 'GoForPayment' },
  { sl: 2, quotationNo: '231972-29-35840-47', orderDate: '12 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Unpaid', invoiceNo: '2509-358407-0100-396482', action: 'GoForPayment' },
  { sl: 3, quotationNo: '231972-29-35840-48', orderDate: '13 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396483', action: 'Invoice' },
  { sl: 4, quotationNo: '231972-29-35840-49', orderDate: '14 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396484', action: 'InvoiceMethalk' },
  { sl: 5, quotationNo: '231972-29-35840-50', orderDate: '15 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396485', action: 'GoForPayment' },
  { sl: 6, quotationNo: '231972-29-35840-51', orderDate: '16 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Rejected', invoiceNo: '2509-358407-0100-396486', action: 'Regenerate' },
  { sl: 7, quotationNo: '231972-29-35840-52', orderDate: '17 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396487', action: 'GoForPayment' },
  { sl: 8, quotationNo: '231972-29-35840-53', orderDate: '18 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396488', action: 'Invoice' },
  { sl: 9, quotationNo: '231972-29-35840-54', orderDate: '19 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396489', action: 'InvoiceMethalk' },
  { sl: 10, quotationNo: '231972-29-35840-55', orderDate: '20 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396490', action: 'GoForPayment' },
  // Repeat and vary for 40 total
  { sl: 11, quotationNo: '231972-29-35840-56', orderDate: '21 Dec 2023', service: 'SMS Package', amount: '200 BDT', status: 'Unpaid', invoiceNo: '2509-358407-0100-396491', action: 'GoForPayment' },
  { sl: 12, quotationNo: '231972-29-35840-57', orderDate: '22 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Unpaid', invoiceNo: '2509-358407-0100-396492', action: 'GoForPayment' },
  { sl: 13, quotationNo: '231972-29-35840-58', orderDate: '23 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396493', action: 'Invoice' },
  { sl: 14, quotationNo: '231972-29-35840-59', orderDate: '24 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396494', action: 'InvoiceMethalk' },
  { sl: 15, quotationNo: '231972-29-35840-60', orderDate: '25 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396495', action: 'GoForPayment' },
  { sl: 16, quotationNo: '231972-29-35840-61', orderDate: '26 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Rejected', invoiceNo: '2509-358407-0100-396496', action: 'Regenerate' },
  { sl: 17, quotationNo: '231972-29-35840-62', orderDate: '27 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396497', action: 'GoForPayment' },
  { sl: 18, quotationNo: '231972-29-35840-63', orderDate: '28 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396498', action: 'Invoice' },
  { sl: 19, quotationNo: '231972-29-35840-64', orderDate: '29 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396499', action: 'InvoiceMethalk' },
  { sl: 20, quotationNo: '231972-29-35840-65', orderDate: '30 Dec 2023', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396500', action: 'GoForPayment' },
  // 21-40
  { sl: 21, quotationNo: '231972-29-35840-66', orderDate: '31 Dec 2023', service: 'SMS Package', amount: '200 BDT', status: 'Unpaid', invoiceNo: '2509-358407-0100-396501', action: 'GoForPayment' },
  { sl: 22, quotationNo: '231972-29-35840-67', orderDate: '01 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Unpaid', invoiceNo: '2509-358407-0100-396502', action: 'GoForPayment' },
  { sl: 23, quotationNo: '231972-29-35840-68', orderDate: '02 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396503', action: 'Invoice' },
  { sl: 24, quotationNo: '231972-29-35840-69', orderDate: '03 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396504', action: 'InvoiceMethalk' },
  { sl: 25, quotationNo: '231972-29-35840-70', orderDate: '04 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396505', action: 'GoForPayment' },
  { sl: 26, quotationNo: '231972-29-35840-71', orderDate: '05 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Rejected', invoiceNo: '2509-358407-0100-396506', action: 'Regenerate' },
  { sl: 27, quotationNo: '231972-29-35840-72', orderDate: '06 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396507', action: 'GoForPayment' },
  { sl: 28, quotationNo: '231972-29-35840-73', orderDate: '07 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396508', action: 'Invoice' },
  { sl: 29, quotationNo: '231972-29-35840-74', orderDate: '08 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396509', action: 'InvoiceMethalk' },
  { sl: 30, quotationNo: '231972-29-35840-75', orderDate: '09 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396510', action: 'GoForPayment' },
  { sl: 31, quotationNo: '231972-29-35840-76', orderDate: '10 Jan 2024', service: 'SMS Package', amount: '200 BDT', status: 'Unpaid', invoiceNo: '2509-358407-0100-396511', action: 'GoForPayment' },
  { sl: 32, quotationNo: '231972-29-35840-77', orderDate: '11 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Unpaid', invoiceNo: '2509-358407-0100-396512', action: 'GoForPayment' },
  { sl: 33, quotationNo: '231972-29-35840-78', orderDate: '12 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396513', action: 'Invoice' },
  { sl: 34, quotationNo: '231972-29-35840-79', orderDate: '13 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396514', action: 'InvoiceMethalk' },
  { sl: 35, quotationNo: '231972-29-35840-80', orderDate: '14 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396515', action: 'GoForPayment' },
  { sl: 36, quotationNo: '231972-29-35840-81', orderDate: '15 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Rejected', invoiceNo: '2509-358407-0100-396516', action: 'Regenerate' },
  { sl: 37, quotationNo: '231972-29-35840-82', orderDate: '16 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396517', action: 'GoForPayment' },
  { sl: 38, quotationNo: '231972-29-35840-83', orderDate: '17 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396518', action: 'Invoice' },
  { sl: 39, quotationNo: '231972-29-35840-84', orderDate: '18 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396519', action: 'InvoiceMethalk' },
  { sl: 40, quotationNo: '231972-29-35840-85', orderDate: '19 Jan 2024', service: 'Hot Jobs', amount: '200 BDT', status: 'Paid', invoiceNo: '2509-358407-0100-396520', action: 'GoForPayment' },
];

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {
  billingData = BILLING_DATA;

  // Filters
  serviceFilter: string = '';
  statusFilter: string = '';
  startDate: string | null = null;
  endDate: string | null = null;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // For action modals (not implemented yet)
  // showDetailsModal = false;
  // selectedService: BillingRow | null = null;

  get filteredData(): BillingRow[] {
    return this.billingData.filter(row => {
      const serviceMatch = this.serviceFilter ? row.service === this.serviceFilter : true;
      const statusMatch = this.statusFilter ? row.status === this.statusFilter : true;
      // Date filter logic can be added here if needed
      return serviceMatch && statusMatch;
    });
  }

  get paginatedData(): BillingRow[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  setServiceFilter(service: string) {
    this.serviceFilter = service;
    this.currentPage = 1;
  }

  setStatusFilter(status: string) {
    this.statusFilter = status;
    this.currentPage = 1;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
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
}
