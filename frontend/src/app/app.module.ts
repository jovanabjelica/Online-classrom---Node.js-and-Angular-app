import { NgModule} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { RegisterComponent } from './register/register.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { CvComponent } from './cv/cv.component';
import { TeacherMenuComponent } from './teacher-menu/teacher-menu.component';
import { TeacherInfoComponent } from './teacher-info/teacher-info.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordChange1Component } from './password-change1/password-change1.component';
import { PasswordChange2Component } from './password-change2/password-change2.component';
import { DatePipe } from '@angular/common';
import { ClassStudentComponent } from './class-student/class-student.component';
import { MyStudentsComponent } from './my-students/my-students.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { ClassTeacherComponent } from './class-teacher/class-teacher.component';
import { AdminChartsComponent } from './admin-charts/admin-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    HomeComponent,
    LoginComponent,
    ProfilePictureComponent,
    RegisterComponent,
    RegisterStudentComponent,
    RegisterTeacherComponent,
    StudentComponent,
    TeacherComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    CvComponent,
    TeacherMenuComponent,
    TeacherInfoComponent,
    PasswordChangeComponent,
    PasswordChange1Component,
    PasswordChange2Component,
    ClassStudentComponent,
    MyStudentsComponent,
    AdminChangePasswordComponent,
    ClassTeacherComponent,
    AdminChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
