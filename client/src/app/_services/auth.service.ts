import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IToken, IRegister, IRegisterData, ILogin, IActivate } from "../_models";
import { TokenStorageService } from "./token-storage.service";
import { UserService } from "./user.service";

const REGISTER_URL = '/api/v1/auth/users/'
const LOGIN_URL = '/api/v1/auth/jwt/create/'
const ACTIVATION_URL = '/api/v1/auth/users/activation/'
const REFRESH_URL = '/api/v1/auth/jwt/refresh/'
const VERIFY_URL = '/api/v1/auth/jwt/verify/'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenStorageService, private userService: UserService) {}

  login(loginData: ILogin) {
    return this.http.post<IToken>(LOGIN_URL, loginData, httpOptions).pipe(map(token => {
      this.userService.getUser().subscribe({
        next: (user) => {
          this.userService.userSubject.next(user)
        }
      })
      return token
    }));
  }

  logout() {
    this.userService.userSubject.next(null)
    this.tokenService.removeToken()
  }

  register(registerData: IRegister): Observable<IRegisterData> {
    return this.http.post<IRegisterData>(REGISTER_URL, registerData, httpOptions)
  }

  activate(activateData: IActivate):Observable<void> {
    return this.http.post<void>(ACTIVATION_URL, activateData, httpOptions)
  }

  refreshToken(token: IToken) {
    return this.http.post<{access: string}>(REFRESH_URL, {refresh: token.refresh}, httpOptions).pipe(map(({access}) => {
      return {
        access,
        refresh: token.refresh
      }
    }))
  }

  verifyToken(token: IToken) {
    return this.http.post<void>(VERIFY_URL, token, httpOptions)
  }
}