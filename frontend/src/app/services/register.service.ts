import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  url: string = "http://localhost:4000";

  checkUsername(username: String) {
    const data = {
      username: username
    };

    return this.http.post(`${this.url}/register/username`, data);
  }

  checkEmail(email: String) {
    const data = {
      email: email
    };

    return this.http.post(`${this.url}/register/email`, data);
  }

  registerStudent(username: String, password: String, firstname: String, lastname: String, email: String, mobile: String, 
  securityQuestion: String, securityAnswer: String, gender: String, address: String, grade: Number, type: String) {

    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      mobile: mobile,
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer,
      gender: gender,
      address: address,
      grade: grade,
      type: type
    }; 

    return this.http.post(`${this.url}/student/register`, data);
  }

  registerTeacher(username: String, password: String, firstname: String, lastname: String, email: String, mobile: String, 
    securityQuestion: String, securityAnswer: String, gender: String, address: String, subjects: String[], grades: String[], source: String) {
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      mobile: mobile,
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer,
      gender: gender,
      address: address,
      subjects: subjects,
      grades: grades,
      source: source
    };

    return this.http.post(`${this.url}/teacher/register`, data);
  }

  uploadCV(username: string, cv: File) {

    const formData = new FormData();
    formData.append('username', username);
    formData.append('file', cv);
  
    return this.http.post(`${this.url}/teacher/cv`, formData);
  }

  uploadPicture(username: string, file: File) {
    const data = {
      username: username,
      file: file
    };

    const formData = new FormData();

    formData.append('username', username);
    formData.append('file', file);

    return this.http.post(`${this.url}/register/picture`, formData);
  }

  getAllSubjects() {
    return this.http.get(`${this.url}/subject/get`);
  }
}
