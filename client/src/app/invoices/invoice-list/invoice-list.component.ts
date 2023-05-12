import { Component } from '@angular/core';

import { InvoicesService } from '@app/_services/invoices.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent {
  invoices$ = this.invoiceService.invoices$;
  showAddForm = false;

  constructor(private invoiceService: InvoicesService) {}
}
