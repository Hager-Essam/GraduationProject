import {Routes} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {LoginComponent} from './features/auth/Login/login.component';
import {RegisterComponent} from './features/auth/PatientRegister/register.component';
import {ForgetPasswordComponent} from './features/auth/forget-password/forget-password.component';
import {PatientComponent} from './features/patient/patient.component';
import {SpecialistComponent} from './features/specialist/specialist.component';
import {ConsultationComponent} from './features/consultation/consultation.component';
import {ReportComponent} from './features/report/report.component';
import {ProfileComponent} from './features/profile/profile.component';
import {ChatComponent} from './features/chat/chat.component';
import {SpecialistLoginComponent} from './features/auth/specialist-login/specialist-login.component';
import {SpecialistRegisterComponent} from './features/auth/specialist-register/specialist-register.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'patientLogin', component:LoginComponent},
  {path: 'specialist', component: SpecialistLoginComponent},
  {path: 'consultation', component: ConsultationComponent},
  {path: 'report', component: ReportComponent},
  {path: 'profile', component: ProfileComponent},
  {path:'chat' ,component:ChatComponent},
  {path:'register' ,component:RegisterComponent},
  {path:'registerAsSpecialist',component:SpecialistRegisterComponent},
  {path:'patient',component:PatientComponent},
  {path:'specialistLogin',component:SpecialistComponent},
  {path:'PatientPage',component:PatientComponent}
];
