import {Routes} from '@angular/router';
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
import {DashboardComponent} from './features/DashboardFolder/dashboard/dashboard.component';
import {LearnComponent} from './features/learn/learn.component';
import {DeletePatientComponent} from './features/DashboardFolder/delete-patient/delete-patient.component';
import {RestoreSpecialistComponent} from './features/DashboardFolder/restore-specialist/restore-specialist.component';
import {DeleteSpecialistComponent} from './features/DashboardFolder/delete-specialist/delete-specialist.component';
import {EmailsComponent} from './features/DashboardFolder/emails/emails.component';
import {
  PaymentTransactionsComponent
} from './features/DashboardFolder/payment-transactions/payment-transactions.component';
import {RestorePatientComponent} from './features/DashboardFolder/restore-patient/restore-patient.component';
import {ModelsStatisticsComponent} from './features/DashboardFolder/models-statistics/models-statistics.component';
import {SpecialistChatsComponent} from './features/specialist-chats/specialist-chats.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, data: {animation: 'home'}},
  {path: 'home', component: HomeComponent, data: {animation: 'home'}},
  {path: 'consultation', component: ConsultationComponent, data: {animation: 'consultation'}},
  {path: 'report', component: ReportComponent, data: {animation: 'report'}},
  {path: 'profile', component: ProfileComponent, data: {animation: 'profile'}},
  { path: 'chat/:receiverId', component: ChatComponent },
  {path: 'patient', component: PatientComponent},
  {path: 'specialist', component: SpecialistComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login/:role', component: LoginComponent},
  {path: 'register-patient', component: PatientRegisterComponent},
  {path: 'register-specialist', component: SpecialistRegisterComponent},
  {path: 'forgot-password/:role', component: ForgetPasswordComponent},
  {path: 'reset-page/:role', component: ResetPageComponent},
  {path: 'code-page/:role', component: CodePageComponent},
  {path: 'learn', component: LearnComponent},
  {path: 'deletePatient', component: DeletePatientComponent},
  {path: 'deleteSpecialist', component: DeleteSpecialistComponent},
  {path: 'restorePatient', component: RestorePatientComponent},
  {path: 'restoreSpecialist', component: RestoreSpecialistComponent},
  {path: 'emails', component: EmailsComponent},
  {path: 'paymentTransaction', component: PaymentTransactionsComponent},
  {path: 'modelsStstistics', component: ModelsStatisticsComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path:'show-chats',component:SpecialistChatsComponent}
];
