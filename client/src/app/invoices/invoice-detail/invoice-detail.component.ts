import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInvoice } from '@app/_models';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent {
  showEditForm = false;
  invoice: IInvoice = this.route.snapshot.data['invoice'];

  constructor(private route: ActivatedRoute) {}
}
