import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  constructor(private service: RegisterService, private route: ActivatedRoute, private router: Router) {}

  username: string = "";
  email: string = "";

  firstname: string = "";
  lastname: string = "";
  password: string = "";
  mobile: string = "";
  securityQuestion: string = "";
  securityAnswer: string = "";
  gender: string = "";
  address: string = "";
  grade: number = 1;
  type: string = "";

  errorFirstname: string = "";
  errorLastname: string = "";
  errorPassword: string = "";
  errorMobile: string = "";
  errorSecurityQ: string = "";
  errorSecurityA: string = "";
  errorGender: string = "";
  errorAddress: String = "";
  errorGrade: string = "";
  errorType: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        if (!params) return;
          
        let data = params as any;

        this.username = data.username;
        this.email = data.email;
      }
    )
  }
  
  checkPassword() {
    //check if the password form is good
    if (this.password.length < 6 || this.password.length > 10) {
      this.errorPassword = "Lozinka mora imati minimalno 6 i maksimalno 10 karaktera!";
      return false;
    }

    if (!/^[a-zA-Z]/.test(this.password)) {
      this.errorPassword = "Lozinka mora poceti velikim slovom!";
      return false;
    }
  
    if (!/[A-Z]/.test(this.password)) {
      this.errorPassword = "Lozinka mora imati bar jedno veliko slovo!";
      return false;
    }
  
    if ((this.password.match(/[a-z]/g) || []).length < 3) {
      this.errorPassword = "Lozinka mora imati bar 3 mala slova!";
      return false;
    }
  
    if (!/\d/.test(this.password)) {
      this.errorPassword = "Lozinka mora imati bar 1 broj!";
      return false;
    }
  
    if (!/[!@#\$%\^&\*\(\)_\+{}\[\]:;<>,.?~\\/-]/.test(this.password)) {
      this.errorPassword = "Lozinka mora sadrzati bar 1 specijalni karakter!";
      return false;
    }

    return true;
  }

  checkInput() {
    if (this.firstname.length == 0) {
      this.errorFirstname = "Morate uneti ime!";
      return false;
    }

    if (this.lastname.length == 0) {
      this.errorLastname = "Morate uneti prezime!";
      return false;
    }

    if (this.password.length == 0) {
      this.errorPassword = "Morate uneti lozinku!";
      return false;
    }

    if (!this.checkPassword()) return false;

    if (this.mobile.length == 0) {
      this.errorMobile = "Morate uneti broj telefona!";
      return false;
    }

    if (this.securityQuestion.length == 0) {
      this.errorSecurityQ = "Morate uneti bezbedonosno pitanje!";
      return false;
    }

    if (this.securityAnswer.length == 0) {
      this.errorSecurityA = "Morate uneti bezbedonosni odgovor!";
      return false;
    }

    if (this.gender.length == 0) {
      this.errorGender = "Morate odabrati pol!";
      return false;
    }

    if (this.address.length == 0) {
      this.errorAddress = "Morate uneti adresu!";
      return false;
    }

    if (this.type.length == 0) {
      this.errorType = "Morate uneti tip skole!";
      return false;
    }

    if (this.grade == 0) {
      this.errorGrade = "Nepravilan format godine!";
      return false;
    }

    return true;
  }
  
  registracija() {
    this.errorFirstname = "";
    this.errorLastname = "";
    this.errorMobile = "";
    this.errorSecurityQ = "";
    this.errorSecurityA = "";
    this.errorGender = "";
    this.errorAddress = "";
    this.errorGrade = "";
    this.errorType = "";
    this.errorPassword = "";

    if (!this.checkInput()) return;

    this.service.registerStudent(this.username, this.password, this.firstname, this.lastname, this.email, 
    this.mobile, this.securityQuestion, this.securityAnswer, this.gender, this.address, this.grade, this.type).subscribe(
      (data)=>{
        if (!data) {
          alert("Error");
          return;
        }

        alert("Uspesno ste se registrovali!");

        const params = {
          username: this.username,
          type: 's'
        }

        this.router.navigate(['profilePicture', params]);
      }
    )
  }
}
