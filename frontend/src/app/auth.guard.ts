import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const token = this.authService.getTokenInfo();
    const hasToken: boolean = token !== undefined && token !== null;

    if (!hasToken) {
      this.router.navigate(['/login']);
      return false;
    }

    const userType = this.authService.getUserInfo();

    // Agregar lógica para verificar el tipo de usuario y permitir o denegar el acceso a rutas
    if (userType) {
      if (userType.toLowerCase() === 'constructor') {
        // Usuario tipo 'constructor' puede acceder a ciertas rutas
        return true;
      } else if (userType.toLowerCase() === 'proveedor') {
        // Usuario tipo 'proveedor' puede acceder a otras rutas
        return true;
      }
    }

    // Si el tipo de usuario no es reconocido, redirige a la página de login
    this.router.navigate(['/login']);
    return false;
  }
}
