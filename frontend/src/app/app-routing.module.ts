import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeComponent } from './auth/change/change.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { DefaultComponent } from './layout/default/default.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';


const routes: Routes = [
	{
		path: 'login', component: LoginComponent
	},
	{
		path: 'reset-password', component: ResetComponent
	},
	{
		path: 'change-password/:token', component: ChangeComponent
	},
	{
		path: '',
		component: DefaultComponent,
		children: [
			{
				path: '',
				component: DashboardComponent
			},
			{
				path: 'patients',
				component: PatientsComponent,
				children: [
					{
						path: 'edit',
						component: PatientsComponent
					}
				]
			},
		]
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
