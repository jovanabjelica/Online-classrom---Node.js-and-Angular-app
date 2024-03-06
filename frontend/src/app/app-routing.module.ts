import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './home/home.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RegisterTeacherComponent } from './register-teacher/register-teacher.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { AdminComponent } from './admin/admin.component';
import { CvComponent } from './cv/cv.component';
import { TeacherMenuComponent } from './teacher-menu/teacher-menu.component';
import { TeacherInfoComponent } from './teacher-info/teacher-info.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { PasswordChange1Component } from './password-change1/password-change1.component';
import { PasswordChange2Component } from './password-change2/password-change2.component';
import { ClassStudentComponent } from './class-student/class-student.component';
import { MyStudentsComponent } from './my-students/my-students.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';
import { ClassTeacherComponent } from './class-teacher/class-teacher.component';
import { AdminChartsComponent } from './admin-charts/admin-charts.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registerStudent', component: RegisterStudentComponent },
  { path: 'registerTeacher', component: RegisterTeacherComponent },
  { path: 'login/vingardiumLeviosa', component: AdminLoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'profilePicture', component: ProfilePictureComponent },
  { path: 'student', component: StudentComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'cv', component: CvComponent },
  { path: 'teacherMenu/:username', component: TeacherMenuComponent },
  { path: 'student/:username', component: StudentComponent },
  { path: 'teacherInfo/:username/:teacher', component: TeacherInfoComponent },
  { path: 'change', component: PasswordChangeComponent },
  { path: 'change1', component: PasswordChange1Component },
  { path: 'change2', component: PasswordChange2Component },
  { path: 'class/:teacher', component: ClassTeacherComponent },
  { path: 'teacher/:username', component: TeacherComponent },
  { path: 'studentClass/:username', component: ClassStudentComponent },
  { path: 'myStudents/:username', component: MyStudentsComponent },
  { path: 'login/vingardiumLeviosa/adminChangePassword', component: AdminChangePasswordComponent },
  { path: 'charts', component: AdminChartsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
