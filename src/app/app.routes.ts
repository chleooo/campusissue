import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewReportComponent } from './newreport/report.component';
import { SubmitComponent } from './submitreport/submit.component';
import { AdminComponent } from './admin/admin.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { Routes } from '@angular/router';

export const routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'new-report', component: NewReportComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'facilities', component: FacilitiesComponent }
];

