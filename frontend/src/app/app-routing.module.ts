import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeComponent } from './auth/change/change.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ScopeGuard } from './guards/scope/scope.guard';
import { AuthComponent } from './layout/auth/auth.component';
import { DefaultComponent } from './layout/default/default.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { CovidTestComponent } from './pages/covid-test/covid-test/covid-test.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
	{
		path: '',
		component: LandingPageComponent,
	},
	{
		path: '',
		component: AuthComponent,
		children: [
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
		],
	},
	{
		path: 'admin',
		component: DefaultComponent,
		children: [
			{
				path: '',
				component: DashboardComponent,
				canActivate: [ScopeGuard],
				data: {
					scopes: ['--view-all'],
				},
			},
			{
				path: 'patients',
				component: PatientsComponent
			},
			{
				path: 'covid-tests',
				component: CovidTestComponent,
			},
			{
				path: 'users',
				component: UsersComponent,
				canActivate: [ScopeGuard],
				data: {
					scopes: ['--view-users'],
				},
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
