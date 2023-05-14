import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IInvoice } from '@app/_models';
import { InvoicesService } from '@app/_services/invoices.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent {
  modalOpen = false;
  showEditForm = false;
  showDeleteForm = false;
  invoice: IInvoice = this.route.snapshot.data['invoice'];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private invoiceService: InvoicesService
  ) {}

  goBack = () => {
    this.location.back();
  };

  closeModal = () => {
    this.showDeleteForm = false;
    this.showEditForm = false;
    this.modalOpen = false;
  };

  openEditForm = () => {
    this.modalOpen = true;
    this.showEditForm = true;
  };

  openDeleteForm = () => {
    this.modalOpen = true;
    this.showDeleteForm = true;
  };

  markAsPaid() {
    this.invoiceService
      .updateInvoice(this.invoice.id!, {
        ...this.invoice,
        status: 'paid',
      })
      .subscribe({
        next: () => {
          this.errorMessage = '';
          window.location.reload();
        },
        error: (err) => {
          this.errorMessage =
            err.error.error ||
            err.error.detail ||
            'Operation failed. Please try again later.';
        },
      });
  }
}
