import { Component } from '@angular/core';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';
import { TeacherService } from '../services/teacher.service';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change1',
  templateUrl: './password-change1.component.html',
  styleUrls: ['./password-change1.component.css']
})
export class PasswordChange1Component {

  username: string = "";
  type: string = "";
  errUsername: string = "";

  user: Student | Teacher | null = null;

  goodAnswer: boolean = false;

  answer: string = "";

  constructor(private serviceTeacher: TeacherService, private serviceStudent: StudentService, private router: Router) {}
  
  findUser() {
    if (this.username == "") {
      this.errUsername = "Morate uneti korisnicko ime.";
      return;
    }

    this.serviceStudent.getOne(this.username).subscribe(data => {
        if (!data) {
          this.serviceTeacher.getOne(this.username).subscribe(data=> {
            if (!data) {
              this.errUsername = "Nepostojece korisnicko ime!";
              return;
            }
            else {
              this.errUsername = "";
              this.user = data as Teacher;
              this.type = 't';
            }
          });
        }
        else {
          this.errUsername = "";
          this.user = data as Student;
          this.type = 's';
        }
      }
    )
  }

  errAnswer: string = "";

  answerCheck() {
    if (this.answer == this.user?.securityAnswer) {
      this.goodAnswer = true;
      this.errAnswer = "";
    }
    else {
      this.goodAnswer = false;
      this.errAnswer = "Pogresan odgovor!";
    }
  }

  password: string = "";
  check: string = "";
  errPassword: string = "";

  checkPassword() {
    if (this.password.length < 6 || this.password.length > 10) {
      this.errPassword = "Lozinka mora imati minimalno 6 i maksimalno 10 karaktera!";
      return false;
    }

    if (!/^[a-zA-Z]/.test(this.password)) {
      this.errPassword = "Lozinka mora poceti velikim slovom!";
      return false;
    }
  
    if (!/[A-Z]/.test(this.password)) {
      this.errPassword = "Lozinka mora imati bar jedno veliko slovo!";
      return false;
    }
  
    if ((this.password.match(/[a-z]/g) || []).length < 3) {
      this.errPassword = "Lozinka mora imati bar 3 mala slova!";
      return false;
    }
  
    if (!/\d/.test(this.password)) {
      this.errPassword = "Lozinka mora imati bar 1 broj!";
      return false;
    }
  
    if (!/[!@#\$%\^&\*\(\)_\+{}\[\]:;<>,.?~\\/-]/.test(this.password)) {
      this.errPassword = "Lozinka mora sadrzati bar 1 specijalni karakter!";
      return false;
    }

    return true;
  }

  change() {
    if (this.check !== this.password) {
      this.errPassword = "Lozinka i potvrda lozinke se ne podudaraju!";
      return;
    }
  
    if (!this.checkPassword()) return;
  
    this.errPassword = "";
  
    if (this.type == 't') {
      this.serviceTeacher.changePassword(this.username, this.password).subscribe(data => {
        alert("Lozinka uspesno promenjena!");
        this.router.navigate(['login']);
      })
    }
    else {
      this.serviceStudent.changePassword(this.username, this.password).subscribe(data => {
        alert("Lozinka uspesno promenjena!");
        this.router.navigate(['login']);
      })
    }
  }
}
