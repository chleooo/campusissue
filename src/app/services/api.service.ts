import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // AUTH
  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // USER STORAGE
  setUser(user: any) {
    localStorage.setItem('campuscare_user', JSON.stringify(user));
  }

  getUser() {
    const data = localStorage.getItem('campuscare_user');
    return data ? JSON.parse(data) : null;
  }

  logout() {
    localStorage.removeItem('campuscare_user');
  }

  // REPORTS
  createReport(data: any) {
    return this.http.post(`${this.baseUrl}/reports`, data);
  }

  getReports() {
    return this.http.get(`${this.baseUrl}/reports`);
  }

  // 🔥 THIS IS WHAT WAS MISSING / NOT REGISTERED PROPERLY
  getUserReports(userId: number) {
    return this.http.get(`${this.baseUrl}/reports/user/${userId}`);
  }

  getReportById(id: number) {
    return this.http.get(`${this.baseUrl}/reports/${id}`);
  }

  updateStatus(id: number, status: string) {
    return this.http.put(`${this.baseUrl}/reports/status/${id}`, { status });
  }

  deleteReport(id: number) {
    return this.http.delete(`${this.baseUrl}/reports/${id}`);
  }

  updateProfile(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/users/${id}`, data);
  }
}