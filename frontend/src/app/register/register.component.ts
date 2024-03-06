import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private service: RegisterService, private router: Router) {}

  username: string = "";
  email: string = "";
  type: string = "";

  errorUsername: String = "";
  errorEmail: String = "";
  errorType: String = "";

  registracija() {
    this.errorUsername = "";
    this.errorType = "";
    this.errorEmail = "";

    if (this.username.length == 0) {
      this.errorUsername = "Morate uneti korisnicko ime!";
      return;
    }

    if (this.email.length == 0) {
      this.errorEmail = "Morate uneti e-mail!";
      return;
    }

    if (this.type.length == 0) {
      this.errorType = "Morate odabrati tip korisnika!";
      return;
    }

    this.service.checkUsername(this.username).subscribe(
      (data)=>{
        if (!data) return;

        let ret = data as any;
        let msg: String = ret.msg;

        if (msg == "username taken") {
          this.errorUsername = "Korisnicko ime vec zauzeto!";
          return;
        }

        this.service.checkEmail(this.email).subscribe(
          (data)=>{
            if (!data) return;

            let ret = data as any;
            let msg: String = ret.msg;
    
            if (msg == "email taken") {
              this.errorEmail = "Email je vec u upotrebi!";
              return;
            }

            const param = {
              username: this.username,
              email: this.email
            }

            if (this.type == "student") {
              this.router.navigate(['registerStudent', param]);
            } else {
              this.router.navigate(['registerTeacher', param]);
            }
          }
        );
      }
    );
  }
}
