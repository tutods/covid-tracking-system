import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './components/Layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: '',
				component: DashboardComponent
			},
			{
				path: 'patients',
				component: PatientsComponent
			},
		]
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
