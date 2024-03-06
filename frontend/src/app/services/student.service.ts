import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  getOne(username: string) {
    const data = {
      username: username
    };

    return this.http.post(`${this.url}/student/getOne`, data);
  }

  getAll() {
    return this.http.get(`${this.url}/student/get`);
  }

  changeName(username: string, name: string) {
    const data = {
      username: username,
      name: name
    };

    return this.http.post(`${this.url}/student/chName`, data);
  }

  changeLastname(username: string, lastname: string) {
    const data = {
      username: username,
      lastname: lastname
    };

    return this.http.post(`${this.url}/student/chLastname`, data);
  }

  changeAddress(username: string, address: string) {
    const data = {
      username: username,
      address: address
    };

    return this.http.post(`${this.url}/student/chAddress`, data);
  } 

  changeType(username: string, type: string) {
    const data = {
      username: username,
      type: type
    };

    return this.http.post(`${this.url}/student/chType`, data);
  }

  changeGrade(username: string, type: string, grade: number) {
    const data = {
      username: username,
      type: type,
      grade: grade
    };

    return this.http.post(`${this.url}/student/chGrade`, data);
  }

  changePassword(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.url}/student/chPassword`, data);
  }

  getClasses(username: string) {
    const data = {
      username: username
    }

    return this.http.post(`${this.url}/student/getClasses`, data);
  }

  addReview(username: string, teacher: string, review: number) {
    const data = {
      username: username,
      teacher: teacher,
      review: review
    }

    return this.http.post(`${this.url}/student/addReview`, data);
  }
}
