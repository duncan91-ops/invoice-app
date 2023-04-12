import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { IToken, IRegister, ILogin, IUser, IActivate } from './auth.models';

const REGISTER_URL = '/api/v1/auth/users/'
const GET_USER_URL = '/api/v1/auth/users/me/'
const LOGIN_URL = '/api/v1/auth/jwt/create/'
const ACTIVATION_URL = '/api/v1/auth/users/activation/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token$!: Observable<IToken>;
  user$!: Observable<IUser>;

  constructor(private http: HttpClient) { }

  login(loginData: ILogin) {
    this.token$ = this.http.post<IToken>(LOGIN_URL, loginData)
  }

  register(registerData: IRegister) {
    this.http.post(REGISTER_URL, registerData)
  }

  activate(activateData: IActivate) {
    this.http.post(ACTIVATION_URL, activateData)
  }

  getUser() {
    this.user$ = this.http.get<IUser>(GET_USER_URL)
  }

  saveToken(token: IToken) {
    const tokenString = JSON.stringify(token)
    localStorage.setItem('token', tokenString)
  }

  getToken() {
    const tokenString = localStorage.getItem('token')
    const token = JSON.parse(tokenString || '{}') as IToken
    return token
  }
}
