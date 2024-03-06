import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:4000";

  getActiveTeachers() {
    return this.http.get(`${this.url}/teacher/active`);
  }

  getStudents() {
    return this.http.get(`${this.url}/student/get`);
  } 
}
