import { Component, OnInit } from '@angular/core';

import { Teacher } from '../models/teacher';
import { AdminService } from '../services/admin.service';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../services/register.service';
import { Subject } from '../models/subject';
import { Student } from '../models/student';
import { TeacherService } from '../services/teacher.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit  {
  allTeachers: Teacher[] = [];

  subjectsChart: any;
  genderChart: any;

  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  students: Student[] = [];

  otherSub: string[] = [];

  grades: string[] = ["5-8. razred", "1-4. razred", "Srednja skola"];

  maleCount: number = 0;
  femaleCount: number = 0;

  constructor(
    private service: AdminService,
    private http: HttpClient,
    private regService: RegisterService,
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.service.getRequests().subscribe((data) => {
      if (!data) return;
      this.teachers = data as Teacher[];

      this.teacherService.getAll().subscribe((data) => {
        let teachers = data as Teacher[];

        for (let t of teachers) {
          if (t.status == "odobreno") {
            this.allTeachers.push(t);
          }
        }

        this.studentService.getAll().subscribe((data) => {
          this.students = data as Student[];

          this.regService.getAllSubjects().subscribe((data) => {
            this.subjects = data as Subject[];

            for (let t of this.allTeachers) {
              for (let s of t.subjects) {
                let checkSubjects = this.subjects.some((sub) => sub.name === s);
                let checkOtherSub = this.otherSub.includes(s);

                if (!checkSubjects && !checkOtherSub) {
                  this.otherSub.push(s);
                }
              }
            }
          });
        });
      });
    });
  }

  errAdd: string = '';
  name: string = '';

  add(): void {
    if (this.name === '') {
      this.errAdd = 'Morate uneti naziv predmeta!';
      return;
    }

    this.errAdd = '';

    this.teacherService.addSub(this.name).subscribe((data) => {
      this.name = '';
      alert('Predmet uspešno dodat');
      this.service.getRequests().subscribe((data) => {
        if (!data) return;
        this.teachers = data as Teacher[];

        this.teacherService.getAll().subscribe((data) => {
          this.allTeachers = data as Teacher[];

          this.studentService.getAll().subscribe((data) => {
            this.students = data as Student[];

            this.regService.getAllSubjects().subscribe((data) => {
              this.subjects = data as Subject[];

              for (let t of this.allTeachers) {
                for (let s of t.subjects) {
                  let checkSubjects = this.subjects.some((sub) => sub.name === s);
                  let checkOtherSub = this.otherSub.includes(s);

                  if (!checkSubjects && !checkOtherSub) {
                    this.otherSub.push(s);
                  }
                }
              }
            });
          });
        });
      });
    });
  }

  addSub(name: string): void {
    this.teacherService.addSub(name).subscribe((data) => {
      alert('Predmet uspešno dodat!');
      this.service.getRequests().subscribe((data) => {
        if (!data) return;
        this.teachers = data as Teacher[];

        this.teacherService.getAll().subscribe((data) => {
          this.allTeachers = data as Teacher[];

          this.studentService.getAll().subscribe((data) => {
            this.students = data as Student[];

            this.regService.getAllSubjects().subscribe((data) => {
              this.subjects = data as Subject[];
              this.otherSub = [];
              for (let t of this.allTeachers) {
                for (let s of t.subjects) {
                  let checkSubjects = this.subjects.some((sub) => sub.name === s);
                  let checkOtherSub = this.otherSub.includes(s);

                  if (!checkSubjects && !checkOtherSub) {
                    this.otherSub.push(s);
                  }
                }
              }
            });
          });
        });
      });
    });
  }

  downloadCv(teacher: any): void {
    const url = `../../assets/cv/${teacher.cv}`;

    this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
      (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        window.open(url);
      },
      (error) => {
        console.error('Greška prilikom preuzimanja fajla:', error);
      }
    );
  }

  accept(teacher: string): void {
    this.service.accept(teacher).subscribe((data) => {
      if (!data) return;
      this.service.getRequests().subscribe((data) => {
        if (!data) return;
        this.teachers = data as Teacher[];
        this.otherSub = [];
        this.regService.getAllSubjects().subscribe((data) => {
          this.subjects = data as Subject[];

          for (let t of this.allTeachers) {
            for (let s of t.subjects) {
              let checkSubjects = this.subjects.some((sub) => sub.name === s);
              let checkOtherSub = this.otherSub.includes(s);

              if (!checkSubjects && !checkOtherSub) {
                this.otherSub.push(s);
              }
            }
          }

          this.teacherService.getAll().subscribe(data=>{
            this.allTeachers = []
            let teachers = data as Teacher[];
    
            for (let t of teachers) {
              if (t.status == 'odobreno') this.allTeachers.push(t);
            }
          });  
        });
      });
    });
  }

  reject(teacher: string): void {
    this.service.reject(teacher).subscribe((data) => {
      if (!data) return;
      alert("Nastavnik uspesno odbijen!");
      this.service.getRequests().subscribe((data) => {
        if (!data) return;
        this.teachers = data as Teacher[];
      });
    });
  }

  deactivate(teacher: string): void {
    this.showTeacherForUpdate = false;
    this.service.reject(teacher).subscribe((data)=>{
      alert("Nastavnik uspesno deaktiviran!");
      this.teacherService.getAll().subscribe(data=>{
        this.allTeachers = []
        let teachers = data as Teacher[];

        for (let t of teachers) {
          if (t.status == 'odobreno') this.allTeachers.push(t);
        }
      });      
    });
  }

  teacher: Teacher = new Teacher();
  showTeacherForUpdate: boolean = false;

  update(teacher: string) {
    this.showTeacherForUpdate = true;

    this.teacherService.getOne(teacher).subscribe(data => {
      this.teacher = data as Teacher;
    })
  }

  hide() {
    this.showTeacherForUpdate = false;
  }

  updatedGrades: string[] = [];
  
  selectedGrades(event: Event, grade: string) {
    const input = event.target as HTMLInputElement;
    
    if (input.checked == true) {
      this.updatedGrades.push(grade)
    }
    else {
      this.updatedGrades = this.updatedGrades.filter(item => item !== grade);
    }
  }

  errGrades:string = "";
  updateGrades() {
    if (this.updatedGrades.length == 0) {
      this.errGrades = "Nastavnik mora da ima bar jedan odabran razred u listi razreda!";
      return;
    }

    this.errGrades = "";

    this.teacherService.changeGrades(this.teacher.username, this.updatedGrades).subscribe(data => {
      alert("Predmeti uspesno azurirani!");
      this.updatedGrades = [];
      this.updatedSubjects = [];
      
      this.teacherService.getOne(this.teacher.username).subscribe(data => {
        this.teacher = data as Teacher;
      });
    });
  }

  updatedSubjects: string[] = [];

  selectedSubject(event: Event, subject: string) {
    const input = event.target as HTMLInputElement;

    if (input.checked == true) {
      this.updatedSubjects.push(subject);
    } else {
      this.updatedSubjects = this.updatedSubjects.filter(item=> item !== subject);
    }
  }

  errSubjects: string = "";
  updateSubjects() {
    if (this.updatedSubjects.length == 0) {
      this.errSubjects = "Nastavnik mora da ima bar jedan odabran predmet u listi predmeta!"
      return;
    }

    this.errSubjects = "";

    this.teacherService.changeSubjects(this.teacher.username, this.updatedSubjects).subscribe(data => {
      this.updatedGrades = [];
      this.updatedSubjects = [];
      
      this.teacherService.getOne(this.teacher.username).subscribe(data => {
        this.teacher = data as Teacher;
      });
    })    
  }
}
