import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceDeleteComponent } from './invoice-delete/invoice-delete.component'

@NgModule({
  declarations: [InvoiceListComponent, InvoiceDetailComponent, InvoicesComponent, InvoiceAddComponent, InvoiceEditComponent, InvoiceDeleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
