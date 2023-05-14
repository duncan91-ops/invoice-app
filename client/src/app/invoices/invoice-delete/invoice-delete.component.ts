import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IInvoice } from '@app/_models';
import { InvoicesService } from '@app/_services/invoices.service';

@Component({
  selector: 'app-invoice-delete',
  templateUrl: './invoice-delete.component.html',
  styleUrls: ['./invoice-delete.component.scss'],
})
export class InvoiceDeleteComponent {
  @Input() invoice!: IInvoice;
  @Output() close = new EventEmitter<void>();
  errorMessage: string = '';

  constructor(
    private invoiceService: InvoicesService,
    private router: Router
  ) {}

  delete() {
    this.invoiceService.deleteInvoice(this.invoice.id!).subscribe({
      next: (data: { [key: string]: string }) => {
        if (data['success']) {
          this.router.navigate(['/invoices']);
        } else if (data['failure']) {
          this.errorMessage = data['failure'];
        }
      },
      error: (err) => {
        console.log(err);
        if (err.error && err.error.error) {
          this.errorMessage = err.error.error;
        } else {
          this.errorMessage = 'Deletion Failed';
        }
      },
    });
  }
}
