import { Router, UrlTree } from "@angular/router";
import { LoginService } from "../services/login.service";
import { inject } from "@angular/core";

export const AuthGuard = (): true | UrlTree => {
    const loginService = inject(LoginService);
    const router = inject(Router);
    if (!!loginService.token) {
      return true;
    }
  
    // back to landing page
    return router.createUrlTree(['']);
  }