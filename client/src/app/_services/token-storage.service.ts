import { Injectable } from "@angular/core";

import { IToken } from "../_models";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {}

  saveToken(token: IToken) {
    localStorage.removeItem('token')
    localStorage.setItem('token', JSON.stringify(token))
  }

  getToken() {
    const tokenString = localStorage.getItem('token')
    return JSON.parse(tokenString || '{}')
  }

  removeToken() {
    localStorage.removeItem('token')
  }

  isLoggedIn() {
    if (this.getToken()?.access) {
      return true
    }
    return false
  }
}