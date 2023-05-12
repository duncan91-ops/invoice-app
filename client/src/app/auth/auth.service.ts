import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs'
import { IToken, IRegister, ILogin, IUser, IActivate, IRegisterData } from './auth.models';

const REGISTER_URL = '/api/v1/auth/users/'
const GET_USER_URL = '/api/v1/auth/users/me/'
const LOGIN_URL = '/api/v1/auth/jwt/create/'
const REFRESH_URL = '/api/v1/auth/jwt/refresh/'
const ACTIVATION_URL = '/api/v1/auth/users/activation/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<IUser | null>(null)
  user$ = this.userSubject.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  login(loginData: ILogin) {
    this.http.post<IToken>(LOGIN_URL, loginData, this.httpOptions).subscribe((token) => {
      this.getUser(token).subscribe({
        next: (user) => {
          this.userSubject.next(user)
          this.isLoggedInSubject.next(true)
        }
      })
      const tokenString = JSON.stringify(token)
      localStorage.setItem('token', tokenString)
      this.router.navigate(['/'])
    })
  }

  logout() {
    this.userSubject.next(null)
    localStorage.removeItem('token')
    this.isLoggedInSubject.next(false)
  }

  register(registerData: IRegister): Observable<IRegisterData> {
    return this.http.post<IRegisterData>(REGISTER_URL, registerData, this.httpOptions)
  }

  activate(activateData: IActivate):Observable<void> {
    return this.http.post<void>(ACTIVATION_URL, activateData, this.httpOptions)
  }

  getToken() {
    const tokenString = localStorage.getItem('token')
    const token = JSON.parse(tokenString || '{}') as IToken
    return token
  }

  refreshToken() {
    const token = this.getToken()
    return this.http.post<{access: string}>(REFRESH_URL, {refresh: token.refresh}, this.httpOptions)
  }

  getUser(token: IToken) {
    return this.http.get<IUser>(GET_USER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.access}`
      })
    })
  }

  getInitialUser(token: IToken) {
    this.http.get<IUser>(GET_USER_URL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.access}`
      })
    }).subscribe((user) => {
      this.userSubject.next(user)
      this.isLoggedInSubject.next(true)
    })
  }
}
