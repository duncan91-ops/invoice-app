import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from "@angular/router";

import { TokenStorageService } from "../_services/token-storage.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tokenService = inject(TokenStorageService)
  const router = inject(Router)

  if (tokenService.isLoggedIn()) {
    return true
  }

  return router.parseUrl('auth/login')
}