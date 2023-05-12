import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { authGuard } from '@app/_helpers/auth.guard';
import { invoiceDetailResolver } from '@app/_helpers/invoice-detail.resolver';

const routes: Routes = [
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: InvoiceListComponent },
      {
        path: ':id',
        component: InvoiceDetailComponent,
        resolve: { invoice: invoiceDetailResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
