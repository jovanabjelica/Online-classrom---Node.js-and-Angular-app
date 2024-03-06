import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { TeacherService } from '../services/teacher.service';
import { Class } from '../models/class';
import { Teacher } from '../models/teacher';

@Component({
  selector: 'app-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.css']
})
export class ClassStudentComponent implements OnInit {
  username: string = "";
  student: Student = new Student();
  classes: Class[] = [];

  currentDate: Date = new Date();
  
  year = this.currentDate.getFullYear();
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  day = this.currentDate.getDate().toString().padStart(2, '0');
  hours = this.currentDate.getHours().toString().padStart(2, '0');
  minutes = this.currentDate.getMinutes().toString().padStart(2, '0');

  formatted = `${this.year}-${this.month}-${this.day}T${this.hours}:${this.minutes}`;
  
  constructor(private route: ActivatedRoute, private studentService: StudentService, private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      let p = data as any;

      this.username = p.username;
      this.studentService.getOne(this.username).subscribe(data => {
        this.student = data as Student;
      
        this.studentService.getClasses(this.username).subscribe(data => {
          this.classes = data as Class[];
          this.classes.sort((a: Class, b: Class) => { return a.datetime > b.datetime ? 1 : -1 });
        })
      })
    })
  }

  review: number = 1;

  reviews: { [key: string]: number } = {};

  formatDateTime(dateTimeString: string): Date {
    return new Date(dateTimeString);
  }

  isWithin15Minutes(dateTime: string): boolean {
    const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
    const classTime = new Date(dateTime).getTime();
    const currentTime = new Date().getTime();
  
    return classTime - currentTime <= fifteenMinutesInMilliseconds;
  }
  
  joinClass(c: Class): void {

  }
  
  submitReview(c: Class) {
    this.teacherService.addReview(this.username, c.teacher, this.reviews[c.teacher+c.student+c.datetime+c.subject]).subscribe(data => {
      if (!data) return;
      this.teacherService.addReviewToClass(c.student, c.teacher, c.descr, c.subject, c.datetime, this.reviews[c.teacher+c.student+c.datetime+c.subject]).subscribe(data => {
        this.review = 1;
        alert("Ocena uspesno dodata!");
        this.studentService.getClasses(this.username).subscribe(data => {
          this.classes = data as Class[];
          this.classes.sort((a: Class, b: Class) => { return a.datetime > b.datetime ? 1 : -1 });
        })
      })
    })
  }

  comment: string = '';
  errComm: string = '';

  comments: { [key: string]: string } = {};

  submitComment(c: Class) {
    if (!this.comments[c.teacher+c.student+c.datetime+c.subject]) {
      this.errComm = "Morate uneti komentar!";
      return;
    }
    this.teacherService.getOne(c.teacher).subscribe(data => {
      let teacher = data as Teacher;

      teacher.comments.push(this.comments[c.teacher+c.student+c.datetime+c.subject]);
      this.teacherService.addComment(c.teacher, teacher.comments).subscribe(data=>{
        if (!data) return;
        this.teacherService.addCommentToClass(c.student, c.teacher, c.descr, c.subject, c.datetime, this.comments[c.teacher+c.student+c.datetime+c.subject]).subscribe(data => {
          this.comment='';
          alert('Komentar uspesno dodat!');
          this.studentService.getClasses(this.username).subscribe(data => {
            this.classes = data as Class[];
            this.classes.sort((a: Class, b: Class) => { return a.datetime > b.datetime ? 1 : -1 });
          })
        })
      })
    })
  }
}
