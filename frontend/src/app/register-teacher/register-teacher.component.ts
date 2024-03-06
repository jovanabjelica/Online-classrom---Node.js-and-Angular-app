import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {
  
  ngOnInit(): void {
      this.route.params.subscribe(
        (data)=>{
          const params = data as any;

          this.username = params.username;
          this.email = params.email;

          this.service.getAllSubjects().subscribe(
            (data)=> {
              if (!data) return;

              this.subjectsFromMongo = data as Subject[];
            }
          )
        }
      )
  }

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
  source: string = "";

  otherSubject: string = "";

  subjects: string[] = [];
  grades: string[] = []; 

  subjectsFromMongo: Subject[] = [];

  errorFirstname: string = "";
  errorLastname: string = "";
  errorPassword: string = "";
  errorMobile: string = "";
  errorSecurityQ: string = "";
  errorSecurityA: string = "";
  errorGender: string = "";
  errorAddress: String = "";

  errorSubjects: string = "";
  errorGrades: string = "";
  errorSource: string = "";

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

    if (this.subjects.length == 0) {
      this.errorSubjects = "Morate odabrati barem 1 predmet!";
      return false;
    }

    if (this.grades.length == 0) {
      this.errorGrades = "Morate odabrati uzrast ucenika!";
      return false;
    }

    if (this.source.length == 0) {
      this.errorSource = "Morate popuniti ovo polje!";
      return false;
    }

    return true;
  }

  selectedSubject(event: Event, subject: string) {
    const input = event.target as HTMLInputElement;

    if (input.checked == true) {
      this.subjects.push(subject);
    } else {
      this.subjects = this.subjects.filter(item=> item !== subject);
    }
  }

  selectedGrade(event: Event, grade: string) {
    const input = event.target as HTMLInputElement;

    if (input.checked == true) {
      this.grades.push(grade);
    } else {
      this.grades = this.grades.filter(item=> item !== grade);
    }
  }

  registracija() {
    this.errorFirstname = "";
    this.errorLastname = "";
    this.errorMobile = "";
    this.errorSecurityQ = "";
    this.errorSecurityA = "";
    this.errorGender = "";
    this.errorAddress = "";
    this.errorSubjects = "";
    this.errorGrades = "";
    this.errorSource = "";
    this.errorPassword = "";

    if (this.otherSubject != "") {
      let other = this.otherSubject.split(',')
      for (let i = 0; i < other.length; i++)
        this.subjects.push(other[i]);
    }

    if (!this.checkInput()) return;

    this.service.registerTeacher(this.username, this.password, this.firstname, this.lastname, this.email, this.mobile, this.securityQuestion,
    this.securityAnswer, this.gender, this.address, this.subjects, this.grades, this.source).subscribe(
      (data) => {
        if (!data) {
          alert("Greska! Pokusajte ponovo za nekoliko trenutaka!");
        }

        const p = {
          username: this.username
        }

        this.router.navigate(['/cv', p]);        
      }
    );
  }
}
