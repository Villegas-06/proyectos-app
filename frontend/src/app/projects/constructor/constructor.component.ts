import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ProyectosService } from '../../services/proyectos.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-constructor',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './constructor.component.html',
  styleUrl: './constructor.component.css',
})
export class ConstructorComponent {
  createProject: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private proyectosService: ProyectosService
  ) {
    this.createProject = this.formBuilder.group({
      project_name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]*$')],
      ],
      initial_project_date: ['', [Validators.required]],
      final_project_date: ['', [Validators.required]],
      images: this.formBuilder.array(
        [],
        [Validators.required, this.validateMinImages(1)]
      ),
      items_list: this.formBuilder.array([]),
    });
  }

  get projectItems(): FormArray {
    return this.createProject.get('items_list') as FormArray;
  }

  addProjectItem() {
    this.projectItems.push(
      this.formBuilder.group({
        item_name: ['', [Validators.required]],
        unit_value: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]+(,[0-9]+)?$'),
            this.validateNumericInput.bind(this),
          ],
        ],
      })
    );
  }

  removeProjectItem(index: number) {
    this.projectItems.removeAt(index);
  }

  // Método de validación personalizado para permitir solo numeros
  validateNumericInput(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;

    const isValid = /^\d+(\.\d+)?$/.test(value);

    if (!isValid) {
      return { numericError: true };
    }

    return null;
  }

  validateMinImages(minImages: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.length < minImages) {
        return { minImages: { required: minImages } };
      }
      return null;
    };
  }
  get imageArray() {
    return this.createProject.get('images') as FormArray;
  }

  handleImageInput(event: any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        this.imageArray.push(this.formBuilder.control(file));
      }
    }
  }

  onSubmit() {
    const formData = this.createProject.value;

    const fechaInicial = new Date(
      `${this.createProject.value.initial_project_date}T12:00:00.000`
    );
    const fechaFinal = new Date(
      `${this.createProject.value.final_project_date}T12:00:00.000`
    );
    const offset = -5 * 60;

    fechaInicial.setMinutes(fechaInicial.getMinutes() - offset);
    fechaFinal.setMinutes(fechaFinal.getMinutes() - offset);

    this.createProject.value.initial_project_date = fechaInicial.toISOString();
    this.createProject.value.final_project_date = fechaFinal.toISOString();

    this.proyectosService.createProject(formData).subscribe(
      (response: any) => {
        if (response.success) {
          Swal.fire({
            title: 'Registro exitoso!',
            text: 'El proyecto ha sido creado satisfactoriamente',
            icon: 'success',
            confirmButtonColor: '#ff4f63',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
          }).then((result) => {});
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.message}`,
          });
        }
      },
      (error: any) => {
        console.error('Error creating project:', error);
      }
    );
  }
}
