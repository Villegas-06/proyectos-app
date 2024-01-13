import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

import { ProyectosService } from '../../services/proyectos.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css',
})
export class ProveedorComponent {
  private apiUrl = 'http://localhost:3000/api/constructor_projects';

  projectsData: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authService.getTokenInfo(),
    });

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.projectsData = data;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
}
