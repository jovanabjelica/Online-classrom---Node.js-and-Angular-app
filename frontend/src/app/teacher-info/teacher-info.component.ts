import { Component, OnInit } from '@angular/core';
import { Teacher } from '../models/teacher';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css']
})

export class TeacherInfoComponent implements OnInit {
  username: string = "";
  studentUsername: string = "";
  teacher: Teacher = new Teacher();

  constructor(private route: ActivatedRoute, private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      if (!data) return;
      const p = data as any;

      this.username = p.teacher;
      this.studentUsername = p.username;
      
      this.teacherService.getOne(this.username).subscribe(data => this.teacher = data as Teacher)
    })
  }

  choosen: string = "";
  datetime: string = "";
  descr: string = "";
  double: boolean = false;

  errorForm: string = "";

  datetimeReformat(datetime: string): string[] {
    const [datePart, timePart] = datetime.split("T");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes] = timePart.split(":");
    
    let resultArray = [day, month, year, hours, minutes];

    return resultArray;
  }

  checkFormAppInput() {
    if (this.choosen == "") {
      this.errorForm = "Morate odabrati predmet!";
      return;
    }

    if (this.datetime == "") {
      this.errorForm = "Morate odabrati datum i vreme!";
      return;
    }

    if (this.descr == "") {
      this.errorForm = "Morate dodati opis!";
      return;
    }
  }

  appointment() {

    this.checkFormAppInput();

    let ref: string[] = this.datetimeReformat(this.datetime);

    if (ref[4] != '00' && ref[4] != '30') {
      this.errorForm = "Cas mora poceti ili na ceo sat ili na polovinu sata!";
      return;
    }

    let today = new Date(Date.now())

    let todayDate = today.getFullYear() + '-' +
                    ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                    ('0' + today.getDate()).slice(-2) + 'T' +
                    ('0' + today.getHours()).slice(-2) + ':' +
                    ('0' + today.getMinutes()).slice(-2);
    
    if (this.datetime < todayDate) {
      this.errorForm = "Odabrani termin je vec prosao!";
      return;
    }

    if (this.teacher.startWorkTime) {
      let st = this.teacher.startWorkTime.split(':')
      if (st[0] + st[1] > ref[3] + ref[4]) {
        this.errorForm = "Profesor ne radi pre: " + this.teacher.startWorkTime;
        return;
      }
    }

    if (this.teacher.startWorkTime) {
      let st = this.teacher.endWorkTime.split(':')
      if (st[0] + st[1] < ref[3] + ref[4]) {
        this.errorForm = "Profesor ne radi posle: " + this.teacher.endWorkTime;
        return;
      }
    }

    if (!this.teacher.startWorkTime) {
      let st = ['12', '00'];
      if (st[0] + st[1] > ref[3] + ref[4]) {
        this.errorForm = "Profesor ne radi pre: 12:00";
        return;
      }

      st = ['18', '00'];
      if (st[0] + st[1] < ref[3] + ref[4]) {
        this.errorForm = "Profesor ne radi posle: 18:00";
        return;
      }
    }

    let dt = new Date(this.datetime);
    if (dt.getDay() == 5 || dt.getDate() == 6) {
      this.errorForm = "Profesor ne radi vikendom!";
      return;
    }

    let choosenDate = this.datetime.split('T')[0];

    for (let date of this.teacher.restDays) {
      if (choosenDate == date) {
        this.errorForm = "Profesor ne radi na odabrani dan!";
        return;
      }
    }

    let endH;

    if (this.double) {
      endH = Number(ref[3]) + 2;
    }
    else {
      endH = Number(ref[3]) + 1;
    }

    let endChoosenDatetime = ref[2] + '-' + ref[1] + '-' + ref[0] + 'T' + endH + ':' + ref[4];
    
    for (let termin of this.teacher.busyDays) {
      let terminStart = termin.split(' - ')[0];
      let terminEnd = termin.split(' - ')[1];
      let status = termin.split(' - ')[2];

      if (status == 'Z') break;

      if (terminStart == this.datetime) {
        this.errorForm = "Odabrani termin nije dostupan!";
        return;
      }

      if (terminStart < this.datetime && terminEnd > this.datetime) {
        this.errorForm = "Odabrani termin nije dostupan!";
        return;
      }

      if (terminStart < endChoosenDatetime && terminEnd > endChoosenDatetime) {
        this.errorForm = "Odabrani termin nije dostupan!";
        return;
      }
    }

    this.errorForm = "";
   
    let n: Number;
    if (this.double) n = 1;
    else n = 0;

    this.teacher.busyDays.push(this.datetime + ' - ' + endChoosenDatetime + ' - Z' + ' - ' + n);

    this.teacherService.addClass(this.studentUsername, this.username, this.datetime, this.descr, this.teacher.busyDays, this.choosen, n).subscribe(
      data => {
        alert("Cas uspesno zakazan!");
        this.choosen = "";
        this.datetime = "";
        this.descr = "";
        this.double = false;
      }
    )
  }
}
