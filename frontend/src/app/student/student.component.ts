import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{
  
  constructor(private route: ActivatedRoute, private service: StudentService, private router: Router) {}
  
  username: string = "";

  student: Student = new Student();

  firstname: string = "";
  lastname: string = "";
  address: string = "";
  type: string = "";

  errName: string = "";
  errSurname: string = "";
  errAddress: string = "";
  errType: string = "";

  pic: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(
      (data)=>{
        if (!data) return;

        const p = data as any;
        this.username = p.username;

        this.service.getOne(this.username).subscribe(
          data=>{
            if (!data) return;

            this.student = data as Student;
            
          }
        )
      }
    )
  }

  chName() {
    if (this.firstname == "") {
      this.errName = "Morate uneti novo ime!";
      return;
    }

    this.service.changeName(this.username, this.firstname).subscribe(data=>{
      this.student.firstname = this.firstname;
      this.firstname = "";
    })
  }

  chSurname() {
    if (this.lastname == "") {
      this.errSurname = "Morate uneti novo prezime!";
      return;
    }

    this.service.changeLastname(this.username, this.lastname).subscribe(data=>{
      this.student.lastname = this.lastname;
      this.lastname = "";
    })
  }

  chAddress() {
    if (this.address == "") {
      this.errAddress = "Morate uneti novu adresu!";
      return;
    }

    this.service.changeAddress(this.username, this.address).subscribe(data=>{
      this.student.address = this.address;
      this.address = "";
    })
  }

  chType() {
    if (this.type == "") {
      this.errType = "Morate uneti novi tip skole!";
      return;
    }

    this.service.changeType(this.username, this.type).subscribe(data=>{
      this.student.schoolType = this.type;
      this.type = "";
    })
  }

  chGrade() {
    let check = this.student.schoolType == "srednja-gimnazija" || this.student.schoolType == "srednja-strucna" || this.student.schoolType == "srednja-umetnicka"

    if (check && this.student.grade == 4) {
      return;
    }

    this.service.changeGrade(this.username, this.student.schoolType, this.student.grade)
    .subscribe(data => {
      if (this.student.schoolType == 'osnovna' && this.student.grade == 8) this.student.grade= 1;
      else {
        this.student.grade += 1; 
      }
    });
  }

  chProfilePic() {
    const params = {
      username: this.username
    };

    this.router.navigate(['profilePicture', params]);
  }
}
