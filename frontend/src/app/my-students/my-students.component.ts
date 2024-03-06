import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from '../models/class';
import { TeacherService } from '../services/teacher.service';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.css']
})
export class MyStudentsComponent implements OnInit{

  constructor(private route: ActivatedRoute, private teacherService: TeacherService, private studentService: StudentService) {}

  username: string = '';

  classess: Class[] = [];
  students: Student[] = [];


  ngOnInit(): void {
    this.route.params.subscribe(data => {
      const p = data as any;
      this.username = p.username;

      this.teacherService.getAllClasses().subscribe(data => {
        let cl = data as Class[];
        for (let c of cl) {
          if (c.teacher === this.username) {
            this.classess.push(c);
          }
        }

        this.studentService.getAll().subscribe(data => {
          let students = data as Student[];

          for (let c of cl) {
            if (c.teacher === this.username) {

              for (let s of students) {

                if (s.username == c.student) {

                  let check = false;
                  for (let st of this.students) {
                    if (s.username === st.username ) {
                      check = true;
                      break;
                    }
                  }

                  if (!check) this.students.push(s);

                  break;
                }
              }
            }
          }
        })

      })
    })
  }

  show: boolean = false;
  resume: Class[] = [];
  student: Student = new Student();

  showResume(s: Student) {
    this.resume = [];
    this.show = true;
    this.student = s;

    let today = new Date(Date.now());
    let todayFormatted = today.getFullYear() + '-' +
                              ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                              ('0' + today.getDate()).slice(-2) + 'T' +
                              ('0' + today.getHours()).slice(-2) + ':' +
                              ('0' + today.getMinutes()).slice(-2);

    for (let c of this.classess) {
      if (c.student == s.username && todayFormatted > c.datetime) {
        this.resume.push(c);
      }
    }
  }

  hide() {
    this.resume = [];
    this.show = false;
  }

  formatDateTime(dateTimeString: string): Date {
    return new Date(dateTimeString);
  }

  comments: { [key: string]: string } = {};
  commErr: string = '';

  submitComment(c: Class) {

    if (!this.comments[c.teacher+c.student+c.datetime+c.subject]) {
      this.commErr = "Morate da unesete komentar!"
      return;
    }

    this.commErr = '';

    this.teacherService.addTeacherComment(c.student, c.teacher, c.descr, c.subject, c.datetime, this.comments[c.teacher+c.student+c.datetime+c.subject])
    .subscribe(data => {
      alert("Komentar uspesno dodat!")

      this.teacherService.getAllClasses().subscribe(data => {
        this.classess = [];
        let cl = data as Class[];
        for (let c of cl) {
          if (c.teacher === this.username) {
            this.classess.push(c);
          }
        }

        this.studentService.getAll().subscribe(data => {
          let students = data as Student[];
          this.students = [];
          
          for (let c of cl) {
            if (c.teacher === this.username) {

              for (let s of students) {

                if (s.username == c.student) {

                  let check = false;
                  for (let st of this.students) {
                    if (s.username === st.username ) {
                      check = true;
                      break;
                    }
                  }

                  if (!check) this.students.push(s);

                  break;
                }
              }
            }
          }

          let today = new Date(Date.now());
          let todayFormatted = today.getFullYear() + '-' +
                                    ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                                    ('0' + today.getDate()).slice(-2) + 'T' +
                                    ('0' + today.getHours()).slice(-2) + ':' +
                                    ('0' + today.getMinutes()).slice(-2);

          this.resume = [];
          for (let c of this.classess) {
            if (c.student == this.student.username && c.datetime < todayFormatted) {
              this.resume.push(c);
            }
          }
        })
      })
    })
  }

  reviews: { [key: string]: number } = {};

  submitReview() {
    this.studentService.addReview(this.student.username, this.username, this.reviews[this.student.username]).
    subscribe(data => {
      alert("Ocena uspesno dodata!");
      this.reviews[this.student.username] = 1;
    })
  }
}
