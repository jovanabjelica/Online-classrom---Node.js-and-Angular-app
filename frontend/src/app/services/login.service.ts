import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.url}/login`, data);
  }

  adminLogin(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }
    
    return this.http.post(`${this.url}/admin/login`, data);
  }
}
