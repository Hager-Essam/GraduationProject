import { Routes } from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {ForgetPasswordComponent} from './features/auth/forget-password/forget-password.component';
import {SpecialistLoginComponent} from './features/auth/specialist-login/specialist-login.component';
import {ConsultationComponent} from './features/consultation/consultation.component';
import {PatientLoginComponent} from './features/auth/patient-login/patient-login.component';
import {ReportComponent} from './features/report/report.component';
import {SpecialistRegisterComponent} from './features/auth/specialist-register/specialist-register.component';
import {SpecialistComponent} from './features/specialist/specialist.component';
import {ProfileComponent} from './features/profile/profile.component';
import {PatientRegisterComponent} from './features/auth/patient-register/patient-register.component';
import {ChatComponent} from './features/chat/chat.component';
import {PatientComponent} from './features/patient/patient.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'patientLogin', component:PatientLoginComponent},
  {path: 'specialistLogin', component: SpecialistLoginComponent},
  {path: 'consultation', component: ConsultationComponent},
  {path: 'report', component: ReportComponent},
  {path: 'profile', component: ProfileComponent},
  {path:'chat' ,component:ChatComponent},
  {path:'register' ,component:PatientRegisterComponent},
  {path:'registerAsSpecialist',component:SpecialistRegisterComponent},
  {path:'patient',component:PatientComponent},
  {path:'specialist',component:SpecialistComponent},
  {path:'PatientPage',component:PatientComponent}
];
