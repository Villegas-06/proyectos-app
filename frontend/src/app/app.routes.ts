import { Routes } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { AuthGuard } from './auth.guard';
import { ConstructorComponent } from './projects/constructor/constructor.component';
import { ProveedorComponent } from './projects/proveedor/proveedor.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {
    path: 'constructor',
    component: ConstructorComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Constructor'] },
  },
  {
    path: 'proveedor',
    component: ProveedorComponent,
    canActivate: [AuthGuard],
    data: { allowedRoles: ['Proveedor'] },
  },
];
