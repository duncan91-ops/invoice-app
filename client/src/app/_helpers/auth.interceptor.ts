import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import {catchError, switchMap, filter, take} from 'rxjs/operators'

import { TokenStorageService } from "../_services/token-storage.service";
import { AuthService } from "../_services/auth.service";
import { IToken } from "../_models";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token = this.tokenService.getToken()
  tokenSubject = new BehaviorSubject<IToken | null>(null)
  isRefreshing = false;

  constructor(private authService: AuthService, private tokenService: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let authReq = req
      if (this.token?.access) {
        authReq = this.addTokenHeader(req, this.token)
      }

      return next.handle(authReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401 && !authReq.url.includes('/api/v1/auth/jwt/create/')) {
            return this.handleUnauthenticatedError(req, next);
          }

          return throwError(() => error)
        })
      )
  }

  private handleUnauthenticatedError(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true
      this.tokenSubject.next(null)

      if (this.token?.refresh) {
        return this.authService.refreshToken(this.token).pipe(switchMap(token => {
          this.isRefreshing = false
          this.tokenService.saveToken(token)
          this.tokenSubject.next(token)
          return next.handle(this.addTokenHeader(req, token))
        }),
        catchError(error => {
          this.isRefreshing = false
          this.authService.logout()
          return throwError(() => error)
        }))
      }
    }

    return this.tokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next.handle(this.addTokenHeader(req, token!)))
    )
  }

  private addTokenHeader(req: HttpRequest<any>, token: IToken) {
    return req.clone({
      setHeaders: {'Authorization': `Bearer ${token.access}`}
    })
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]