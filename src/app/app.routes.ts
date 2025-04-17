import { Routes } from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {ForgetPasswordComponent} from './features/auth/forget-password/forget-password.component';
import {LoginComponent} from './features/auth/Login/Login-component';
import {ConsultationComponent} from './features/consultation/consultation.component';
import {ReportComponent} from './features/report/report.component';
import {SpecialistRegisterComponent} from './features/auth/specialist-register/specialist-register.component';
import {SpecialistComponent} from './features/specialist/specialist.component';
import {ProfileComponent} from './features/profile/profile.component';
import {PatientRegisterComponent} from './features/auth/patient-register/patient-register.component';
import {ChatComponent} from './features/chat/chat.component';
import {PatientComponent} from './features/patient/patient.component';
import {CodePageComponent} from './features/auth/code-page/code-page.component';
import {ResetPageComponent} from './features/auth/reset-page/reset-page.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {LearnComponent} from './features/learn/learn.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'consultation', component: ConsultationComponent},
  {path: 'report', component: ReportComponent},
  {path: 'profile', component: ProfileComponent},
  {path:'chat' ,component:ChatComponent},
  {path:'patient',component:PatientComponent},
  {path:'specialist',component:SpecialistComponent},
  {path:'patient',component:PatientComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'login/:role',component:LoginComponent},
  { path: 'register-patient', component: PatientRegisterComponent },
  { path: 'register-specialist', component: SpecialistRegisterComponent },
  { path: 'forgot-password/:role', component: ForgetPasswordComponent },
  {path: 'reset-page/:role', component: ResetPageComponent },
  {path:'code-page/:role', component: CodePageComponent},
  {path:'learn', component: LearnComponent},
];
