import { inject } from '@angular/core';
import {
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { InvoicesService } from '@app/_services/invoices.service';
import { IInvoice } from '@app/_models';

export const invoiceDetailResolver: ResolveFn<IInvoice> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<IInvoice> => {
  const invoiceService = inject(InvoicesService);
  const id = route.paramMap.get('id')!;
  return invoiceService.retrieveInvoice(id);
};
