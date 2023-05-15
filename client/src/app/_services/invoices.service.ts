import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

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
  constructor(private http: HttpClient) {}

  getInvoices({
    page = 1,
    status,
    client_email,
  }: {
    page?: number;
    status?: string;
    client_email?: string;
  }): Observable<{
    count: number;
    results: IInvoice[];
    next: string | null;
    previous: string | null;
  }> {
    let URL = `/api/v1/invoices/?page=${page}`;

    if (status) {
      URL = `${URL}&status=${status}`;
    }

    if (client_email) {
      URL = `${URL}&client_email=${client_email}`;
    }

    return this.http.get<{
      count: number;
      results: IInvoice[];
      next: string | null;
      previous: string | null;
    }>(URL, httpOptions);
  }

  retrieveInvoice(id: string): Observable<IInvoice> {
    const URL = `/api/v1/invoices/${id}/`;
    return this.http.get<IInvoice>(URL, httpOptions);
  }

  createInvoice(invoiceData: IInvoice) {
    const URL = '/api/v1/invoices/create/';
    return this.http.post<IInvoice>(URL, invoiceData, httpOptions);
  }

  updateInvoice(id: string, invoiceData: IInvoice) {
    const URL = `/api/v1/invoices/${id}/update/`;
    return this.http.patch<IInvoice>(URL, invoiceData, httpOptions);
  }

  deleteInvoice(id: string) {
    const URL = `/api/v1/invoices/${id}/delete/`;
    return this.http.delete<{ [key: string]: string }>(URL, httpOptions);
  }
}
