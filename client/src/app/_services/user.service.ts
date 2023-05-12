import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from 'rxjs/operators'

import { IUser } from "../_models";

const GET_USER_URL = '/api/v1/auth/users/me/'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject = new BehaviorSubject<IUser | null>(null)
  user$ = this.userSubject.asObservable()

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<IUser>(GET_USER_URL, httpOptions)
  }

}