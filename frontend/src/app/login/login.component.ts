import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Teacher } from '../models/teacher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private service: LoginService, private router: Router) {}
  
  ngOnInit(): void {
    this.error = "";     
  }

  username: string = "";
  password: string = "";

  error: string = "";

  prijava() {
    if (this.username == "" || this.password == "") {
      this.error = "Morate popuniti sva polja!";
      return;
    }

    this.service.login(this.username, this.password).subscribe(
      (data)=>{
        if (!data) alert('Greska! Probajte ponovo za nekoliko trenutaka!');

        const ret = data as any;

        let msg: string = ret.msg;

        if (msg == 'bad params') {
          this.error = "Pogresno korisnicko ime ili lozinka!";
          return;
        }

        const params = {
          username: this.username
        }

        if (msg == 's') {
          this.router.navigate(['/student', params]);
        } 
        else {
          let teacher: Teacher = ret.teacher as Teacher;

          if (teacher.status == 'na cekanju') {
            alert('Vas zahtev jos uvek nije odobren!');
            this.username = "";
            this.password = "";
            return;
          }

          this.router.navigate(['/teacher', params]);
        }
      }
    )
  }
}
