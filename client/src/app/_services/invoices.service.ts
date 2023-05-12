import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

import { IInvoice } from '@app/_models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  invoices$ = this.getInvoices();

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<IInvoice[]> {
    const URL = '/api/v1/invoices/';
    return this.http.get<IInvoice[]>(URL, httpOptions).pipe(
      tap((invoices) => {
        console.log(invoices);
      })
    );
  }

  retrieveInvoice(id: string): Observable<IInvoice> {
    const URL = `/api/v1/invoices/${id}/`;
    return this.http.get<IInvoice>(URL, httpOptions);
  }

  createInvoice(invoiceData: IInvoice) {
    const URL = '/api/v1/invoices/create/';
    return this.http.post<IInvoice>(URL, invoiceData, httpOptions);
  }

  updateInvoice(invoiceData: IInvoice) {
    const URL = `/api/v1/invoices/${invoiceData.id}/create/`;
    return this.http.put<IInvoice>(URL, invoiceData, httpOptions);
  }

  deleteInvoice(id: string) {
    const URL = `/api/v1/invoices/${id}/create/`;
    return this.http.delete(URL, httpOptions);
  }
}
