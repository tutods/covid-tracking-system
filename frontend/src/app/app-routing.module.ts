import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeComponent } from './auth/change/change.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { DefaultComponent } from './layout/default/default.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetComponent,
  },
  {
    path: 'change-password/:token',
    component: ChangeComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'admin',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'patients',
        component: PatientsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
