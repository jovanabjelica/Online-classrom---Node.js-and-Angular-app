import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from '../models/class';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';
import { Teacher } from '../models/teacher';
import { Student } from '../models/student';

@Component({
  selector: 'app-class-teacher',
  templateUrl: './class-teacher.component.html',
  styleUrls: ['./class-teacher.component.css']
})
export class ClassTeacherComponent implements OnInit {
  
  username: string = "";
  classes: Class[] = [];
  requests: Class[] = [];

  explanations: { [key: string] : string } = {};
  cancelExplanations: { [key: string] : string } = {}

  inThreeDays: boolean = true;
  inFiveDays: boolean = false;
  anyTime: boolean = false;

  constructor(private route: ActivatedRoute, private teacherService: TeacherService, private studentService: StudentService) {}

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      const params = data as any;
      this.username = params.teacher;

      let today = new Date(Date.now());
      
      let threeDaysFromNow = new Date(today);
      threeDaysFromNow.setDate(today.getDate() + 3);

      let threeDaysFormatted = threeDaysFromNow.getFullYear() + '-' +
                                      ('0' + (threeDaysFromNow.getMonth() + 1)).slice(-2) + '-' +
                                      ('0' + threeDaysFromNow.getDate()).slice(-2) + 'T' +
                                      ('0' + threeDaysFromNow.getHours()).slice(-2) + ':' +
                                      ('0' + threeDaysFromNow.getMinutes()).slice(-2);
      
      let todayFormatted = today.getFullYear() + '-' +
                                ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                                ('0' + today.getDate()).slice(-2) + 'T' +
                                ('0' + today.getHours()).slice(-2) + ':' +
                                ('0' + today.getMinutes()).slice(-2);



      this.teacherService.getAllClasses().subscribe(data => {
        if (!data) return;

        let cl: Class[] = data as Class[];
        let cnt = 0;
        for (let i = 0; i < cl.length; i++) {
          if (cl[i].teacher == this.username && cl[i].datetime <= threeDaysFormatted && cl[i].status == "potvrdjeno" && cl[i].datetime > todayFormatted && cnt < 5) 
            { this.classes.push(cl[i]); cnt++; }
          if (cl[i].teacher == this.username && cl[i].status == "zakazano" && cl[i].datetime > todayFormatted) 
            this.requests.push(cl[i]);
        }

        this.classes.sort((a, b)=> a.datetime > b.datetime ? 1 : -1);

      });
    });
  }  

  showFirst10() {
    this.classes = [];

    let today = new Date(Date.now());
      
    let threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    let threeDaysFormatted = threeDaysFromNow.getFullYear() + '-' +
                                    ('0' + (threeDaysFromNow.getMonth() + 1)).slice(-2) + '-' +
                                    ('0' + threeDaysFromNow.getDate()).slice(-2) + 'T' +
                                    ('0' + threeDaysFromNow.getHours()).slice(-2) + ':' +
                                    ('0' + threeDaysFromNow.getMinutes()).slice(-2);
    
    let todayFormatted = today.getFullYear() + '-' +
                              ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                              ('0' + today.getDate()).slice(-2) + 'T' +
                              ('0' + today.getHours()).slice(-2) + ':' +
                              ('0' + today.getMinutes()).slice(-2);

    this.teacherService.getAllClasses().subscribe(data => {

      let cl: Class[] = data as Class[];
      let cnt = 0;

      for (let c of cl) {
        if (cnt == 10) break;
        if (c.teacher == this.username && c.status == "potvrdjeno" && c.datetime > todayFormatted && c.datetime <= threeDaysFormatted) {
          this.classes.push(c);
          cnt++;
        }
      }

      this.classes.sort((a, b)=> a.datetime > b.datetime ? 1 : -1);
    });
  }

  showAll() {
    this.classes = [];

    let today = new Date(Date.now());
      
    let threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);

    let threeDaysFormatted = threeDaysFromNow.getFullYear() + '-' +
                                    ('0' + (threeDaysFromNow.getMonth() + 1)).slice(-2) + '-' +
                                    ('0' + threeDaysFromNow.getDate()).slice(-2) + 'T' +
                                    ('0' + threeDaysFromNow.getHours()).slice(-2) + ':' +
                                    ('0' + threeDaysFromNow.getMinutes()).slice(-2);
    
    let todayFormatted = today.getFullYear() + '-' +
                              ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                              ('0' + today.getDate()).slice(-2) + 'T' +
                              ('0' + today.getHours()).slice(-2) + ':' +
                              ('0' + today.getMinutes()).slice(-2);

    this.teacherService.getAllClasses().subscribe(data => {

      let cl: Class[] = data as Class[];
      
      for (let c of cl) {
        if (c.teacher == this.username && c.status == "potvrdjeno" && c.datetime > todayFormatted && c.datetime <= threeDaysFormatted) {
          this.classes.push(c);
        }
      }

      this.classes.sort((a, b)=> a.datetime > b.datetime ? 1 : -1);
    });
  }

  formatDateTime(dateTimeString: string): Date {
    return new Date(dateTimeString);
  }

  isWithin15Minutes(dateTime: string): boolean {
    const fifteenMinutesInMilliseconds = 15 * 60 * 1000;
    const classTime = new Date(dateTime).getTime();
    const currentTime = new Date().getTime();
  
    return classTime - currentTime <= fifteenMinutesInMilliseconds;
  }

  isWithin4Hours(datetime: string) {
    const fourHoursInMilliseconds = 4 * 60 * 60 * 1000;
    const classTime = new Date(datetime).getTime();
    const currentTime = new Date().getTime();
  
    return classTime - currentTime > fourHoursInMilliseconds;
  }

  bookClass(c: Class) {
    this.teacherService.getOne(this.username).subscribe(data => {
      let teacher = data as Teacher;

      let newTermins: String[] = [];

      for (let termin of teacher.busyDays) {
        let start = termin.split(' - ')[0]
        let end = termin.split(' - ')[1]
        let double = termin.split(' - ')[3]

        if (start == c.datetime && Number(double) == c.double) newTermins.push(start + ' - ' + end + ' - ' + 'P' + ' - ' + double);
        else newTermins.push(termin);
      }

      this.teacherService.bookClass(c.student, c.teacher, c.descr, c.subject, c.datetime, newTermins).subscribe(data => {
        alert("Cas uspesno zakazan!");

        let today = new Date(Date.now());
      
        let threeDaysFromNow = new Date(today);
        threeDaysFromNow.setDate(today.getDate() + 3);
  
        let threeDaysFormatted = threeDaysFromNow.getFullYear() + '-' +
                                        ('0' + (threeDaysFromNow.getMonth() + 1)).slice(-2) + '-' +
                                        ('0' + threeDaysFromNow.getDate()).slice(-2) + 'T' +
                                        ('0' + threeDaysFromNow.getHours()).slice(-2) + ':' +
                                        ('0' + threeDaysFromNow.getMinutes()).slice(-2);
        
        let todayFormatted = today.getFullYear() + '-' +
                                  ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                                  ('0' + today.getDate()).slice(-2) + 'T' +
                                  ('0' + today.getHours()).slice(-2) + ':' +
                                  ('0' + today.getMinutes()).slice(-2);
  
        this.classes = [];
        this.requests = [];

        this.teacherService.getAllClasses().subscribe(data => {
          if (!data) return;
  
          let cl: Class[] = data as Class[];
          let cnt = 0;
          for (let i = 0; i < cl.length; i++) {
            if (cl[i].teacher == this.username && cl[i].datetime <= threeDaysFormatted && cl[i].status == "potvrdjeno" && cl[i].datetime > todayFormatted && cnt < 5) 
             { this.classes.push(cl[i]); cnt++; }
            if (cl[i].teacher == this.username && cl[i].status == "zakazano" && cl[i].datetime > todayFormatted) 
              this.requests.push(cl[i]);
          }

          this.classes.sort((a, b)=> a.datetime > b.datetime ? 1 : -1);
        });
      });
    })
  }

  errCan: string = "";
  rejectClass(c: Class) {
    
    if (!this.explanations[c.teacher + c.student + c.datetime + c.subject] || this.explanations[c.teacher + c.student + c.datetime + c.subject] == "") {
      this.errCan = "Morate dati obrazlozenje odbijanja casa!";
      return;
    }

    this.errCan = "";

    this.teacherService.rejectClass(c.student, c.teacher, c.descr, c.subject, c.datetime, this.explanations[c.teacher + c.student + c.datetime + c.subject])
    .subscribe(data => {
      alert("Cas uspesno odbijen!");

      this.requests = [];

      let today = new Date(Date.now());
            
      let todayFormatted = today.getFullYear() + '-' +
                                ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                                ('0' + today.getDate()).slice(-2) + 'T' +
                                ('0' + today.getHours()).slice(-2) + ':' +
                                ('0' + today.getMinutes()).slice(-2);
    
      this.teacherService.getAllClasses().subscribe(data => {
        let cl: Class[] = data as Class[];

        for (let i = 0; i < cl.length; i++) {
          if (cl[i].teacher == this.username && cl[i].status == "zakazano" && cl[i].datetime > todayFormatted) 
            this.requests.push(cl[i]);
        }
      })
    })
  }

  startTime: string = "";
  endTime: string = "";

  weekend: boolean = false;

  errTime: string = "";

  addWorkTime() {
    if (this.startTime == "" || this.endTime == "") {
      this.errTime = "Morate dodati pocetno i krajnje vreme!"
      return;
    }

    this.errTime = "";

    this.teacherService.addWorkTime(this.username, this.startTime, this.endTime, this.weekend).subscribe(data=>{
      alert("Radno vreme uspesno dodato!");
      this.startTime = "";
      this.endTime = "";
      this.weekend = false;
    });
  }

  errorC: string = "";
  cancelClass(c: Class) {
    if (!this.cancelExplanations[c.teacher + c.student + c.datetime + c.subject] || this.cancelExplanations[c.teacher + c.student + c.datetime + c.subject]=="") {
      this.errorC = "Morate dati obrazlozenje otkazivanja casa!";
      return; 
    }

    this.errorC = "";
    this.teacherService.cancelClass(c.student, c.teacher, c.descr, c.subject, c.datetime, this.cancelExplanations[c.teacher + c.student + c.datetime + c.subject])
    .subscribe(data => {
      alert("Cas uspesno otkazan!");

      this.classes = [];

      this.teacherService.getAllClasses().subscribe(data => {

        let cl: Class[] = data as Class[]

        let today = new Date(Date.now());
      
        let threeDaysFromNow = new Date(today);
        threeDaysFromNow.setDate(today.getDate() + 3);
  
        let threeDaysFormatted = threeDaysFromNow.getFullYear() + '-' +
                                        ('0' + (threeDaysFromNow.getMonth() + 1)).slice(-2) + '-' +
                                        ('0' + threeDaysFromNow.getDate()).slice(-2) + 'T' +
                                        ('0' + threeDaysFromNow.getHours()).slice(-2) + ':' +
                                        ('0' + threeDaysFromNow.getMinutes()).slice(-2);
        
        let todayFormatted = today.getFullYear() + '-' +
                                  ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                                  ('0' + today.getDate()).slice(-2) + 'T' +
                                  ('0' + today.getHours()).slice(-2) + ':' +
                                  ('0' + today.getMinutes()).slice(-2);

        let cnt = 0;
        for (let c of cl) {

          if (c.teacher == this.username && c.status == "potvrdjeno" && c.datetime <= threeDaysFormatted && c.datetime > todayFormatted && cnt < 5) {this.classes.push(c); cnt++; }

        }

        this.classes.sort((a, b)=> a.datetime > b.datetime ? 1 : -1);
      });
    })
  }

  join(c: Class) {
    //alert("Hello");
  }

  student: Student|null = null;

}