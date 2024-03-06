import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit{
  
  username: string = "";
  teacher: Teacher = new Teacher();

  constructor(private route: ActivatedRoute, private teacherService: TeacherService, private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      let p = data as any;
      this.username = p.username;
      
      this.teacherService.getOne(this.username).subscribe(data=>{
        this.teacher = data as Teacher;
      })
    })
  }

  firstname: string = "";
  lastname: string = "";
  address: string = "";
  email: string = "";
  phone: string = "";
  grades: string[] = [];

  newSubject: string = "";
  oldSubject: string = "";

  error: string = "";

  chProfilePic() {
    const params = {
      username: this.username,
      t: 't'
    };

    this.router.navigate(['profilePicture', params]);
  }

  chFirstname() {
    this.error = '';

    if (this.firstname == '') {
      this.error = 'Morate odabrati ime!';
      return;
    }

    this.error = '';

    this.teacherService.changeFirstname(this.username, this.firstname).subscribe(data=>{
      this.teacher.firstname = this.firstname;
      this.firstname ='';
    })
  }

  chLastname() {
    this.error = '';

    if (this.lastname == '') {
      this.error = 'Morate odabrati prezime!';
      return;
    }

    this.error = '';

    this.teacherService.changeLastname(this.username, this.lastname).subscribe(data=>{
      this.teacher.lastname = this.lastname;
      this.lastname ='';
    })
  }

  chAddress() {
    this.error = '';

    if (this.address == '') {
      this.error = 'Morate odabrati adresu!';
      return;
    }

    this.error = '';

    this.teacherService.changeAddress(this.username, this.address).subscribe(data=>{
      this.teacher.address = this.address;
      this.address ='';
    });
  }

  chEmail() {
    this.error = '';

    if (this.email == '') {
      this.error = 'Morate odabrati email!';
      return;
    }

    this.error = '';

    this.registerService.checkEmail(this.email).subscribe(data => {
      let p = data as any;
      let msg = p.msg;

      if (msg == "email taken") {
        this.error = "Email je vec u upotrebi!";
        return;
      }

      this.error = "";

      this.teacherService.changeEmail(this.teacher.username, this.email).subscribe(data => {
        this.teacher.email = this.email;
        this.email= '';
      })
    })
  }

  chMobile() {
    this.error = '';

    if (this.phone == '') {
      this.error = 'Morate odabrati broj!';
      return;
    }

    this.error = '';

    this.teacherService.changeMobile(this.username, this.phone).subscribe(data=>{
      this.teacher.mobile = this.phone;
      this.phone ='';
    });
  }

  chSubjectsAdd() {
    this.error = '';

    if (this.newSubject == "") {
      this.error = "Morate uneti predmet!";
      return;
    }

    for (let s of this.teacher.subjects) {
      if (s == this.newSubject) {
        this.error = "Predmet se vec nalazi u Vasoj ponudi!";
        return;
      }
    }

    this.error = "";
    this.teacher.subjects.push(this.newSubject);

    this.teacherService.changeSubjects(this.username, this.teacher.subjects).subscribe(data=>{
      this.newSubject = '';
      alert("Predmet uspesno dodat!");
    })
  }

  chSubjectsDel() {
    this.error = '';

    if (this.oldSubject == "") {
      this.error = "Morate uneti predmet!";
      return;
    }

    let check: boolean = false;

    for (let s of this.teacher.subjects) {
      if (s == this.oldSubject) {
        check = true;
        break;
      }
    }

    if (!check) {
      this.error = "Predmet se ne nalazi u Vasoj ponudi!";
      return;
    }

    let sub:string[] = [];

    for (let s of this.teacher.subjects) {
      if (s != this.oldSubject) {
        sub.push(s);
      }
    }

    this.error = "";
    this.teacher.subjects = sub;

    this.teacherService.changeSubjects(this.username, this.teacher.subjects).subscribe(data=>{
      this.oldSubject = '';
      alert("Predmet uspesno izbrisan!");
    })
  }

  chGrades() {
    this.error = "";

    if (this.grades.length == 0) {
      this.error = "Morate odabrati bar 1 uzrast!";
      return;
    }

    this.error = "";
    this.teacher.grades = this.grades;
    this.teacherService.changeGrades(this.username, this.grades).subscribe(data => {
      this.grades = []
      alert("Razredi azurirani");
    });
  }

  selectedGrade(event: Event, grade: string) {
    const input = event.target as HTMLInputElement;

    if (input.checked == true) {
      this.grades.push(grade);
    } else {
      this.grades = this.grades.filter(item=> item !== grade);
    }
  }
}
