import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{
  constructor(private router: Router, private service: LoginService) {}
  
  ngOnInit(): void {
    this.error = "";     
  }

  username: string = "";
  password: string = "";

  error: string = "";

  prijava() {
    this.service.adminLogin(this.username, this.password).subscribe(
      (data)=>{
        if (!data) {
          alert("Greska! Pokusajte ponovo za nekoliko trenutaka!");
          return;
        }
        
        this.router.navigate(['/admin']);
      }
    )
  }
}
