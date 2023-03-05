import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InvoicesComponent} from './invoices.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component'

@NgModule({
  declarations: [InvoicesComponent, InvoiceListComponent, InvoiceDetailComponent],
  imports: [
    CommonModule
  ]
})
export class InvoicesModule { }
