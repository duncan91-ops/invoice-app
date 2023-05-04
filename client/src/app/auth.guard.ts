import { inject } from "@angular/core";
import { CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";

export const authGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.getToken()) {
    return true
  }

  return router.parseUrl('/auth/login')
}