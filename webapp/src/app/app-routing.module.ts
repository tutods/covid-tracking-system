import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './components/Layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: '',
		component: LayoutComponent,
		children: [
			// {
			// 	path: 'covtests',
			// 	component:
			// },
			{
				path: '',
				component: DashboardComponent
			}
		]
	}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
