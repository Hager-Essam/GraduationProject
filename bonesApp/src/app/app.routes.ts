import {Routes} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {LoginComponent} from './features/auth/login/login.component';
import {RegisterComponent} from './features/auth/register/register.component';
import {ForgetPasswordComponent} from './features/auth/forget-password/forget-password.component';
import {PatientComponent} from './features/patient/patient.component';
import {SpecialistComponent} from './features/specialist/specialist.component';
import {ConsultationComponent} from './features/consultation/consultation.component';
import {ReportComponent} from './features/report/report.component';
import {ProfileComponent} from './features/profile/profile.component';
import {ChatComponent} from './features/chat/chat.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'specialist', component: SpecialistComponent},
  {path: 'consultation', component: ConsultationComponent},
  {path: 'report', component: ReportComponent},
  {path: 'profile', component: ProfileComponent},
  {path:'chat' ,component:ChatComponent},
];
