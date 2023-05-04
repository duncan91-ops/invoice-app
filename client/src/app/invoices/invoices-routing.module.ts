import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { InvoicesComponent } from "./invoices/invoices.component";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceDetailComponent } from "./invoice-detail/invoice-detail.component";
import { authGuard } from "../auth.guard";

const routes: Routes = [
  {path: 'invoices', component: InvoicesComponent, canActivateChild: [authGuard], children: [
    {path: '', redirectTo: 'all', pathMatch: 'full'},
    {path: 'all', component: InvoiceListComponent},
    {path: ':id', component: InvoiceDetailComponent},
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule {}