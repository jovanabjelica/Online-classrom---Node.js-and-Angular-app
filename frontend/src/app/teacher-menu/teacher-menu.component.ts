import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../services/home.service';
import { RegisterService } from '../services/register.service';
import { Subject } from '../models/subject';
import { Teacher } from '../models/teacher';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-teacher-menu',
  templateUrl: './teacher-menu.component.html',
  styleUrls: ['./teacher-menu.component.css']
})
export class TeacherMenuComponent implements OnInit{
  constructor(private route: ActivatedRoute, private service: HomeService, private subService: RegisterService, private studentService: StudentService) {}
  
  username: string = "";

  subjects: Subject[] = [];
  teachers: Teacher[] = [];
  selectedSubject: Subject | null = null;

  checkedTeachers: Teacher[] = [];

  student: Student | null = null;

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      if (!data) return;

      const p = data as any;

      this.username = p.username;

      this.studentService.getOne(this.username).subscribe(d =>{
        if (!d) return;

        this.student = d as Student;
      
        this.service.getActiveTeachers().subscribe(
          (t) => {
            if (!t || !this.student) return;
            
            let s = this.student.grade;
            let type = this.student.schoolType;
            let grade;

            if (type == "osnovna" && s <= 4) grade = "1-4. razred";
            else if (type == "osnovna" && s > 4) grade = "5-8. razred";
            else grade = "Srednja skola";
            
            let teachers = t as Teacher[];
  
            for (let t of teachers) {
              let gr = t.grades;
              for (let g of gr) {
                if (g == grade) { this.teachers.push(t); break; }
              }
            }

            this.subService.getAllSubjects().subscribe(
              (sub) => {
                if (!sub) return;
                this.subjects = sub as Subject[];
              }
            );
          }
        );
      });
    });
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

  stringify(teacher: Teacher) {
    return JSON.stringify(teacher);
  }

  getRoundedRating(rating: number): number {
    return Math.round(rating);
  }
  
  getStarArray(rating: number): number[] {
    return new Array(rating).fill(0);
  }  
}
