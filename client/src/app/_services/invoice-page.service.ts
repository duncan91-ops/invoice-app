import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvoicePageService {
  constructor() {}

  getTotalPages(invoiceCount: number) {
    if (invoiceCount === 0) {
      return 1;
    }
    const result = Math.ceil(invoiceCount / 5);
    return result;
  }

  saveCurrentPage(page: number) {
    localStorage.setItem('currentInvoicePage', `${page}`);
  }

  getCurrentPage() {
    const value = localStorage.getItem('currentInvoicePage');
    return Number(value);
  }
}
