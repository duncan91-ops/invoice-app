import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { IInvoice } from './invoices.models';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  invoices$ = this.getInvoices()

  constructor(private http: HttpClient, private authService: AuthService) { }

  getInvoices(): Observable<IInvoice[]> {
    const URL = "/api/v1/invoices/"
    const token = this.authService.getToken()
    return this.http.get<IInvoice[]>(URL, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token?.access}`,
        'Content-Type': 'application/json'
      })
    })
  }

  createInvoice(invoiceData: IInvoice) {
    const URL = "/api/v1/invoices/create/"
    const token = this.authService.getToken()
    return this.http.post<IInvoice>(URL, invoiceData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token?.access}`,
        'Content-Type': 'application/json'
      })
    })
  }

  updateInvoice(invoiceData: IInvoice) {
    const URL = `/api/v1/invoices/${invoiceData.id}/create/`
    const token = this.authService.getToken()
    return this.http.put<IInvoice>(URL, invoiceData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token?.access}`,
        'Content-Type': 'application/json'
      })
    })
  }

  deleteInvoice(id: string) {
    const URL = `/api/v1/invoices/${id}/create/`
    const token = this.authService.getToken()
    return this.http.delete(URL, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token?.access}`,
        'Content-Type': 'application/json'
      })
    })
  }
}
