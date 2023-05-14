import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IInvoice } from '@app/_models';

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

  constructor(private route: ActivatedRoute, private location: Location) {}

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
}
