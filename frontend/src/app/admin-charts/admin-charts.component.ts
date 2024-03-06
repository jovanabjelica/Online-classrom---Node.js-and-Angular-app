import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js/auto';
import { RegisterService } from '../services/register.service';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';
import { Subject } from '../models/subject';
import { Teacher } from '../models/teacher';
import { Student } from '../models/student';
import { Class } from '../models/class';

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-charts.component.html',
  styleUrls: ['./admin-charts.component.css']
})
export class AdminChartsComponent implements OnInit{
  
  constructor(private registerService: RegisterService, private studentService: StudentService, private teacherService: TeacherService) {}

  subjectTeacher: {[key: string]: number} = {};
  gradeTeacher: {[key: string]: number} = {};

  firstTwoCharts() {
    this.registerService.getAllSubjects().subscribe(data => {

      let subjects = data as Subject[];
      let grades: string[] = ['1-4. razred', '5-8. razred', 'Srednja skola']

      this.teacherService.getAll().subscribe(data => {
        
        let teachers = data as Teacher[];

        for (let t of teachers) {
          if (t.status != 'odobreno') continue;
          for (let s of t.subjects) {
            if (!this.subjectTeacher[s]) this.subjectTeacher[s] = 1;
            else this.subjectTeacher[s] += 1;
          }

          for (let g of t.grades) {
            if (!this.gradeTeacher[g]) this.gradeTeacher[g] = 1;
            else this.gradeTeacher[g] += 1;
          }

        }

        for (let s of subjects) {
          if (!this.subjectTeacher[s.name]) this.subjectTeacher[s.name] = 0;
        }

        for (let g of grades) {
          if (!this.gradeTeacher[g]) this.gradeTeacher[g] = 0;
        }

        this.createFirstTwoChart();
      })
    })
  }

  genderTeacher: {[key: string]: number} = {}
  genderStudent: {[key: string]: number} = {}

  thirdAndFourthCharts() {
    this.teacherService.getAll().subscribe(data => {
      let teachers: Teacher[] = data as Teacher[];

      this.studentService.getAll().subscribe(data => {

        let students: Student[] = data as Student[];

        for (let t of teachers) {
          if (t.status!='odobreno') continue;
          if (!this.genderTeacher[t.gender]) this.genderTeacher[t.gender] = 1;
          else this.genderTeacher[t.gender] += 1;
        }

        for (let s of students) {
          if (!this.genderStudent[s.gender]) this.genderStudent[s.gender] = 1;
          else this.genderStudent[s.gender] += 1;
        }

        this.createThirdAndFourthChart();
      })
    })
  }

  weekClass: {[key: number]: [number, string]} = {0: [0, 'Monday'], 
                                                  1: [0, 'Tuesday'], 
                                                  2: [0, 'Wednesday'], 
                                                  3: [0, 'Thursday'], 
                                                  4: [0, 'Friday'], 
                                                  5: [0, 'Saturday'],
                                                  6: [0, 'Sunday']}

  fifthChart() {
    this.teacherService.getAllClasses().subscribe(data => {
      let classes: Class[] =data as Class[];

      for (let cl of classes) {
        let date = new Date(cl.datetime);
        if (date.getFullYear() != 2023) continue;
        this.weekClass[date.getDay()][0] += 1;
      }

      this.createFifthChart();
    })
  }

  teacherClass: {[key: string]: number } = {};
  
  sixthChart() {
    this.teacherService.getAll().subscribe(data => {

      let teachers: Teacher[] = data as Teacher[];

      this.teacherService.getAllClasses().subscribe(data => {
        let classes: Class[] = data as Class[];
        
        for (let t of teachers) {
          for (let cl of classes) {
            let date = new Date(cl.datetime);
            
            if (date.getFullYear() != 2023) continue;

            if (!this.teacherClass[t.username + '-' + date.getMonth()]) this.teacherClass[t.username + '-' + date.getMonth()] = 0
            else this.teacherClass[t.username + '-' + date.getMonth()] += 1;
          }
        }

        this.teacherClass = Object.fromEntries(Object.entries(this.teacherClass).sort(([,a],[,b]) => b - a));
        this.teacherClass = Object.fromEntries(Object.entries(this.teacherClass).slice(0, 10));

        this.createSixthChart();

      });
    })  
  }

  teacherGrades: {[key: number]: number} = {}
  studentGrades: {[key: number]: number} = {}

  extraDiagrams() {

    this.teacherService.getAll().subscribe(data => {
      let teachers: Teacher[] = data as Teacher[];

      for (let t of teachers) {
        if (t.status != 'odobreno') continue;
        let grade = Math.round(t.reviewsAvg);
        if (!this.teacherGrades[grade]) this.teacherGrades[grade] = 1;
        else this.teacherGrades[grade] += 1;
      }

      this.studentService.getAll().subscribe(data => {
        let students: Student[] = data as Student[];
  
        for (let s of students) {
          let grade = Math.round(s.reviewsAvg);
          if (!this.studentGrades[grade]) this.studentGrades[grade] = 1;
          else this.studentGrades[grade] += 1;
        }

        this.createExtras();
      });
    });
  }

  ngOnInit(): void {
    this.firstTwoCharts();
    this.thirdAndFourthCharts();
    this.fifthChart();
    this.sixthChart();
    this.extraDiagrams();
  }
  
  public chart1: any;  
  public chart2: any;

  createFirstTwoChart(){
    let label1: string[] = [];
    let data1: number[] = [];

    for (let key of Object.keys(this.subjectTeacher)) label1.push(key)
    for (let val of Object.values(this.subjectTeacher)) data1.push(val)

    this.chart1 = new Chart("subTeacher", {
      type: 'bar',

      data: {
        labels: label1, 
	       datasets: [
          {
            label: "Broj nastavnika",
            data: data1,
            backgroundColor: 'purple'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }      
    });

    let label2: string[] = [];
    let data2: number[] = [];

    for (let key of Object.keys(this.gradeTeacher)) label2.push(key)
    for (let val of Object.values(this.gradeTeacher)) data2.push(val)

    this.chart2 = new Chart("gradeTeacher", {
      type: 'bar',

      data: {
        labels: label2, 
	       datasets: [
          {
            label: "Broj nastavnika",
            data: data2,
            backgroundColor: 'green'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }      
    });

  }

  public chart3: any;
  public chart4: any;

  createThirdAndFourthChart() {
    let label1: string[] = [];
    let data1: number[] = [];

    for (let key of Object.keys(this.genderTeacher)) label1.push(key)
    for (let val of Object.values(this.genderTeacher)) data1.push(val)

    this.chart3 = new Chart("genderTeacher", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: label1,
	      datasets: [{
        label: 'Broj nastavnika',
        data: data1,
        backgroundColor: [
          'orange',
          'green'    
        ],
        hoverOffset: 4
       }],
      },

      options: {
        aspectRatio:2.5
      }  
    });

    let label2: string[] = [];
    let data2: number[] = [];

    for (let key of Object.keys(this.genderStudent)) label2.push(key)
    for (let val of Object.values(this.genderStudent)) data2.push(val)

    this.chart4 = new Chart("genderStudent", {
      type: 'pie', 

      data: {
        labels: label2,
	      datasets: [{
        label: 'Broj studenata',
        data: data2,
        backgroundColor: [
          'blue',
          'yellow'    
        ],
        hoverOffset: 4
       }],
      },

      options: {
        aspectRatio:2.5
      }  
    });

  }

  public chart5: any;

  createFifthChart() {
    let label1: string[] = [];
    let data1: number[] = [];

    for (let val of Object.values(this.weekClass)) label1.push(val[1])
    for (let val of Object.values(this.weekClass)) data1.push(val[0])

    this.chart5 = new Chart("weekClass", {
      type: 'bar',

      data: {
        labels: label1, 
	       datasets: [
          {
            label: "Broj casova",
            data: data1,
            backgroundColor: 'yellowgreen',
            barPercentage: 0.1,
            categoryPercentage: 0.1
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Days'
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Broj casova'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      },
    });
  }

  public chart6: any;

  createSixthChart() {
    let x = []
    let y = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
    let data = []
    
    for (let key of Object.keys(this.teacherClass)) x.push(key.split('-')[0]);
    for (let val of Object.values(this.teacherClass)) data.push(val);

    this.chart6 = new Chart("chart6", {
      type: 'line',
      data: {
        labels: x,
        datasets: [{
          label: 'Broj časova',
          data: data,
          borderColor: ['blue', 'yellow', 'green', 'purple', 'black', 'orange', 'pink', 'yellowgreen'],
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Nastavnici'
            }
          },
          y: {
            type: 'category',
            labels: y,
            title: {
              display: true,
              text: 'Meseci'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }

  public extra1: any;
  public extra2: any;

  createExtras() {
    let label1: string[] = [];
    let data1: number[] = [];

    for (let key of Object.keys(this.teacherGrades)) label1.push(key)
    for (let val of Object.values(this.teacherGrades)) data1.push(val)

    this.extra1 = new Chart("teacherGrades", {
      type: 'doughnut',

      data: {
        labels: label1,
	      datasets: [{
        label: 'Broj nastavnika',
        data: data1,
        backgroundColor: [
          'green',
          'orange',
          'pink',
          'blue',
          'yellow'    
        ],
        hoverOffset: 5
       }],
      },

      options: {
        aspectRatio:2.5
      }  
    });

    let label2: string[] = [];
    let data2: number[] = []; 

    for (let key of Object.keys(this.studentGrades)) label2.push(key) 
    for (let val of Object.values(this.studentGrades)) data2.push(val)

    this.extra2 = new Chart("studentGrades", {
      type: 'doughnut', 

      data: {
        labels: label2,
	      datasets: [{
        label: 'Broj studenata',
        data: data2,
        backgroundColor: [
          'purple',
          'blue',
          'yellow',
          'green',
          'orange'    
        ],
        hoverOffset: 5
       }],
      },

      options: {
        aspectRatio:2.5
      }  
    });

  }
}
