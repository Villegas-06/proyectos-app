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
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', [Validators.required, Validators.minLength(8)]],
        userType: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  isFormValid() {
    return this.registerForm.valid;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirm_password = formGroup.get('confirm_password')?.value;
    return password === confirm_password ? null : { passwordMismatch: true };
  }

  onSubmit() {
    const formData = this.registerForm.value;
    this.userService.register(formData).subscribe(
      (response: any) => {
        if (response.success) {
          Swal.fire({
            title: 'Registro exitoso!',
            text: 'Serás redirigido al Login luego de confirmar.',
            icon: 'success',
            confirmButtonColor: '#ff4f63',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
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
      (error: any) => {}
    );
  }
}
