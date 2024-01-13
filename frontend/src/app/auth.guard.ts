import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getTokenInfo();
    const hasToken: boolean = token !== undefined && token !== null;

    if (!hasToken) {
      this.router.navigate(['/login']);
      return false;
    }

    const userType = this.authService.getUserInfo();

    if (!userType) {
      // Si el tipo de usuario no está definido, redirigir a la página de login
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = (route.data as { allowedRoles: string[] })
      .allowedRoles;

    if (allowedRoles && !allowedRoles.includes(userType)) {
      // Si el tipo de usuario no está permitido para esta ruta, redirigir a login
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
