import { Component } from '@angular/core';

import { InvoicesService } from '@app/_services/invoices.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent {
  selectedStatusOption = '';
  showFilterOptions = false;
  statusOptions = ['draft', 'pending', 'paid'];
  invoiceCount = 0;
  invoices$ = this.invoiceService.getInvoices({});
  currentPage = 1;

  showAddForm = false;

  constructor(private invoiceService: InvoicesService) {}

  filterBy(option: string) {
    this.currentPage = 1;
    if (option === this.selectedStatusOption) {
      this.selectedStatusOption = '';
    } else {
      this.selectedStatusOption = option;
    }
    this.invoices$ = this.invoiceService.getInvoices({
      status: this.selectedStatusOption,
    });
  }

  nextPage() {
    this.currentPage += 1;
    this.invoices$ = this.invoiceService.getInvoices({
      status: this.selectedStatusOption,
      page: this.currentPage,
    });
  }

  prevPage() {
    this.currentPage -= 1;
    this.invoices$ = this.invoiceService.getInvoices({
      status: this.selectedStatusOption,
      page: this.currentPage,
    });
  }
}
