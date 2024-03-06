import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:4000";  

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }
    
    return this.http.post(`${this.url}/admin/login`, data);
  }  

  getRequests() {
    return this.http.get(`${this.url}/admin/requests`);
  }

  accept(teacher: string) {
    const data = {
      teacher: teacher
    };

    return this.http.post(`${this.url}/admin/accept`, data);
  }

  reject(teacher: string) {
    const data = {
      teacher: teacher
    };

    return this.http.post(`${this.url}/admin/reject`, data);
  }

  chPassword(username: string, password: string) {
    const data = {
      username: username,
      password: password
    };

    return this.http.post(`${this.url}/admin/chPassword`, data);
  }
}
