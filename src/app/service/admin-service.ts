import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  createAdmin(adminData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, adminData);
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminId');
  }

  getAdminId(): string | null {
    return localStorage.getItem('adminId');
  }

  getAdminName(): string | null {
    return localStorage.getItem('adminName');
  }

  logout(): void {
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminRole');
  }
}
