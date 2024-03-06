import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  url: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  getOne(username: string) {
    const data = {
      username: username
    };

    return this.http.post(`${this.url}/teacher/getOne`, data);
  }

  addComment(teacher: string, comments: string[]) {
    const data = {
      teacher: teacher,
      comments: comments
    };

    return this.http.post(`${this.url}/teacher/addComment`, data);
  }

  addReview(username: string, teacher: string, review: Number) {
    const data = {
      username: username,
      teacher: teacher,
      review: review
    };

    return this.http.post(`${this.url}/teacher/addReview`, data);
  }
  
  addClass(student: string, teacher: string, datetime: string, descr: string, all: String[], subject: string, double: Number) {
    const data = {
      student: student,
      teacher: teacher,
      datetime: datetime,
      descr: descr,
      all: all,
      subject: subject, 
      double: double
    }

    return this.http.post(`${this.url}/teacher/addClass`, data);
  }

  changePassword(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.url}/teacher/chPassword`, data);
  }

  changeFirstname(username: string, firstname: string) {
    const data = {
      username: username,
      firstname: firstname
    }   
    
    return this.http.post(`${this.url}/teacher/chName`, data);
  }

  changeLastname(username: string, lastname: string) {
    const data = {
      username: username,
      lastname: lastname
    }   
    
    return this.http.post(`${this.url}/teacher/chLastname`, data);
  }
  
  changeAddress(username: string, address: string) {
    const data = {
      username: username,
      address: address
    }   
    
    return this.http.post(`${this.url}/teacher/chAddress`, data);
  }

  changeEmail(username: string, email: string) {
    const data = {
      username: username,
      email: email
    }   
    
    return this.http.post(`${this.url}/teacher/chEmail`, data);
  }
  
  changeMobile(username: string, mobile: string) {
    const data = {
      username: username,
      mobile: mobile
    }   
    
    return this.http.post(`${this.url}/teacher/chMobile`, data);
  }
  
  changeSubjects(username: string, subjects: string[]) {
    const data = {
      username: username,
      subjects: subjects
    }   
    
    return this.http.post(`${this.url}/teacher/chSub`, data);
  }
  
  changeGrades(username: string, grades: string[]) {
    const data = {
      username: username,
      grades: grades
    }   
    
    return this.http.post(`${this.url}/teacher/chGrades`, data);
  }

  getClassReq(username: string) {
    const data = {
      username: username,
    }   
    
    return this.http.post(`${this.url}/teacher/getClassReq`, data);
  }

  bookClass(student: string, teacher: string, descr: string, subject: string, datetime: string, all: String[]) {
    const data = {
      student: student,
      teacher: teacher,
      descr: descr,
      subject: subject,
      datetime: datetime,
      all: all
    }

    return this.http.post(`${this.url}/teacher/bookClass`, data);
  }

  rejectClass(student: string, teacher: string, descr: string, subject: string, datetime: string, explanation: string) {
    const data = {
      student: student,
      teacher: teacher,
      descr: descr,
      subject: subject,
      datetime: datetime,
      explanation: explanation
    }

    return this.http.post(`${this.url}/teacher/rejectClass`, data);
  }

  addCommentToClass(student: string, teacher: string, descr: string, subject: string, datetime: string, comment: string) {
    const data = {
      student: student,
      teacher: teacher,
      descr: descr,
      subject: subject,
      datetime: datetime,
      comment: comment
    }

    return this.http.post(`${this.url}/teacher/addCommentToClass`, data);
  }

  addReviewToClass(student: string, teacher: string, descr: string, subject: string, datetime: string, review: number) {
    const data = {
      student: student,
      teacher: teacher,
      descr: descr,
      subject: subject,
      datetime: datetime,
      review: review
    }

    return this.http.post(`${this.url}/teacher/addReviewToClass`, data);
  }

  getAllClasses() {
    return this.http.get(`${this.url}/teacher/getAllClasses`);
  }

  cancelClass(student: string, teacher: string, descr: string, subject: string, datetime: string, explanation: string) {
    const data = {
      student: student,
      teacher: teacher,
      descr: descr,
      subject: subject,
      datetime: datetime,
      explanation: explanation
    }

    return this.http.post(`${this.url}/teacher/cancelClass`, data);
  }

  addTeacherComment(student: string, teacher: string, descr: string, subject: string, datetime: string, comment: string) {
    const data = {
      student: student,
      teacher: teacher,
      descr: descr,
      subject: subject,
      datetime: datetime,
      comment: comment
    }

    return this.http.post(`${this.url}/teacher/addTeacherComment`, data);
  }

  getAll() {
    return this.http.get(`${this.url}/teacher/getAll`);
  }

  addSub(name: string) {
    const data = {
      name: name
    };

    return this.http.post(`${this.url}/subject/add`, data);
  }

  addWorkTime(t: string, startTime: string, endTime: string, weekend: boolean) {
    const data = {
      teacher: t,
      startTime: startTime,
      endTime: endTime,
      weekend: weekend      
    }

    return this.http.post(`${this.url}/teacher/addWorkTime`, data);    
  }

  getAllTeacherClasses(teacher: string) {
    const data = {
      teacher: teacher
    }

    return this.http.post(`${this.url}/teacher/getAllTeacherClasses`, data);    
  }
}
