import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private token = this.authService.getTokenInfo();

  createProject(projectData: []): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });

    return this.http.post(`${this.baseUrl}/constructor_projects`, projectData, {
      headers,
    });
  }

  uploadImages(projectId: string, images: File[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });

    const formData = new FormData();

    images.forEach((image, index) => {
      formData.append(`images_${index}`, image);
    });

    return this.http.post<any>(
      `${this.baseUrl}/projects/${projectId}/upload-images`,
      formData,
      { headers }
    );
  }

  getProjectImages(projectId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });

    return this.http.get<any>(
      `${this.baseUrl}/projects/${projectId}/upload-images`,
      {
        headers,
      }
    );
  }
}
