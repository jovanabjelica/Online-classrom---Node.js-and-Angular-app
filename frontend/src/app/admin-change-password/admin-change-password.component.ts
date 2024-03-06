import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent {
  username: string = "";
  old: string = "";
  
  password: string = "";
  check: string = "";

  errPassword: string = "";
  errOld: string = "";
  errUsername: string = "";

  constructor(private service: AdminService, private router: Router) {}

  change() {
    if (this.username == "") {
      this.errUsername = "Morate uneti korisnicko ime!";
      return;
    }

    this.errUsername = "";

    if (this.old == "") {
      this.errOld = "Morate uneti staru lozinku!";
      return;
    }

    this.errOld = "";

    if (this.password == "") {
      this.errPassword = "Morate uneti novu lozinku!";
      return;
    }

    this.errPassword = "";

    if (this.password != this.check) {
      this.errPassword = "Nova i nova ponovljena lozinka se ne podudaraju!";
      return;
    }

    this.errPassword = "";
    
    this.service.login(this.username, this.old).subscribe(data => {
      if (!data) {
        this.errUsername = "Pogresno korisnicko ime ili lozinka!";
        return;
      }

      this.service.chPassword(this.username, this.password).subscribe(data => {
        alert("Lozinka uspesno promenjena!");
        this.router.navigate(['/login/vingardiumLeviosa'])
      })
    })
  }
}
