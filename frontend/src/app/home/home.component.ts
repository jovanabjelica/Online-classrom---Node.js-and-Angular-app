import { Component, OnInit } from '@angular/core';
import { Subject } from '../models/subject';
import { HomeService } from '../services/home.service';
import { RegisterService } from '../services/register.service';
import { Teacher } from '../models/teacher';
import { Student } from '../models/student';
import { Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { Class } from '../models/class';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  studentNum: number = 0;
  teachersNum: number = 0;

  subjects: Subject[] = [];
  teachers: Teacher[] = [];
  selectedSubject: Subject | null = null;

  checkedTeachers: Teacher[] = [];

  byName: string = '';
  bySurname: string = '';
  bySubject: string = '';

  weekNum: number = 0;
  monthNum: number = 0;

  weekAgo: string|null = '';
  monthAgo: string|null = '';

  constructor(private service: HomeService, private subService: RegisterService, private router: Router, private teacherService: TeacherService, private datePipe: DatePipe) {  }

  calculateDates() {
    const currentDate = new Date();

    const oneWeekAgo = new Date(currentDate);
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    this.weekAgo = this.datePipe.transform(oneWeekAgo, 'yyyy-MM-ddTHH:mm');

    const oneMonthAgo = new Date(currentDate);
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    this.monthAgo = this.datePipe.transform(oneMonthAgo, 'yyyy-MM-ddTHH:mm');
  }

  classes: Class[] = [];

  ngOnInit(): void {
    this.calculateDates();
    this.service.getActiveTeachers().subscribe(
      (data) => {
        if (!data) return;

        this.teachers = data as Teacher[];
        this.teachersNum = this.teachers.length;

        this.service.getStudents().subscribe(
          (s) => {
            if (!s) return;

            let students = s as Student[];
            this.studentNum = students.length;

            this.subService.getAllSubjects().subscribe(
              (sub) => {
                if (!sub) return;
                this.subjects = sub as Subject[];

                this.teacherService.getAllClasses().subscribe(data => {
                  this.classes = data as Class[];

                  if (!this.weekAgo) return;
                  if (!this.monthAgo) return;

                  for (let c of this.classes) {
                    if (c.status != 'potvrdjeno') continue;
                    if (c.datetime > this.weekAgo) this.weekNum += 1;
                    if (c.datetime > this.monthAgo) this.monthNum += 1;
                  }
                })
              }
            )
          }
        )
      }
    );
  }

  search: Teacher[] = []

  searchTeachers() {
    this.search = this.teachers;

    if (this.byName != '') {
      this.search = this.search.filter(teacher => teacher.firstname === this.byName);
    }

    if (this.bySurname != '') {
      this.search = this.search.filter(teacher => teacher.lastname === this.bySurname);
    }

    if (this.bySubject != '') {
      let arr = []

      for (let t of this.search) {
        for (let sub of t.subjects) {
          if (sub === this.bySubject) { arr.push(t); break; }
        }
      }

      this.search = arr;
    }

    this.byName = '';
    this.bySurname = '';
    this.bySubject = '';
  
  }

  hideSearch() {
    this.search = [];
  }

  seeTeachers(sub: Subject) {
    this.checkedTeachers = [];
    this.selectedSubject = sub;

    for (let teacher of this.teachers) {
      for (let subject of teacher.subjects) {
        if (subject == sub.name) {
          this.checkedTeachers.push(teacher);
          break;
        }
      }
    }
  }

  hideSubject() {
    this.selectedSubject = null;
  }

  sortSubjectAsc() {
    this.subjects.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  sortSubjectDesc() {
    this.subjects.sort((a, b) => (a.name > b.name) ? -1 : 1);
  }

  sortByNameAscending() {
    this.checkedTeachers.sort((a, b) => (a.firstname > b.firstname) ? 1 : -1);
  }

  sortBySurnameAscending() {
    this.checkedTeachers.sort((a, b) => (a.lastname > b.lastname) ? 1 : -1);
  }

  sortByNameDescending() {
    this.checkedTeachers.sort((a, b) => (a.firstname > b.firstname) ? -1 : 1);
  }

  sortBySurnameDescending() {
    this.checkedTeachers.sort((a, b) => (a.lastname > b.lastname) ? -1 : 1);
  }
}
