import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { Teacher } from '../models/teacher';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-password-change2',
  templateUrl: './password-change2.component.html',
  styleUrls: ['./password-change2.component.css']
})
export class PasswordChange2Component {
  username: string = "";
  type: string = "";
  errUsername: string = "";

  old: string = "";
  errOld: string = "";

  password: string = "";
  check: string = "";
  errPassword: string = "";

  user: Student | Teacher | null = null;

  constructor(private loginService: LoginService, private teacherService: TeacherService, private studentService: StudentService, private router: Router) {}

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
    if (this.username == '') {
      this.errUsername = 'Morate da unesete korisnicko ime!';
      return;
    }

    this.errUsername = '';

    if (this.old == "") {
      this.errOld = "Morate da unesete staru lozinku!";
      return;
    }

    this.errOld = '';

    if (this.password == '') {
      this.errPassword = 'Morate da unesete novu lozinku!';
      return;
    }

    if (!this.checkPassword()) {
      return;
    }

    if (this.check == '') {
      this.errPassword = 'Morate da unesete potvrdu lozinke!';
      return;
    }

    if (this.check != this.password) {
      this.errPassword = 'Lozinka i potvrda lozinke se ne poklapaju!';
      return;
    }

    this.errPassword = '';

    this.loginService.login(this.username, this.old).subscribe(data => {
      const ret = data as any;

      let msg: string = ret.msg;

      if (msg == 'bad params') {
        this.errPassword = "Nepostojece korisnicko ime ili pogresna lozinka!";
        return;
      }

      if (msg == 's') {
        this.studentService.changePassword(this.username, this.password).subscribe(data => {
          alert("Lozinka uspesno promenjena!");
          this.router.navigate(['login']);
        })
      }
      else {
        this.teacherService.changePassword(this.username, this.password).subscribe(data => {
          alert("Lozinka uspesno promenjena!");
          this.router.navigate(['login']);
        })
      }
    })
  }
}
