import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  isFormValid() {
    return this.registerForm.valid;
  }

  onSubmit() {
    const formData = this.registerForm.value;
    this.userService.login(formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.authService.login(response.token, response.user);

          Swal.fire({
            title: 'Autenticado',
            text: 'Serás redirigido a la página según tu tipo de usuario luego de confirmar.',
            icon: 'success',
            confirmButtonColor: '#ff4f63',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              if (response.user.tipo.toLowerCase() === 'constructor') {
                this.router.navigate(['/constructor']);
              } else {
                this.router.navigate(['/proveedor']);
              }
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.message}`,
          });
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
