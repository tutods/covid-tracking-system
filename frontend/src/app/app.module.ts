import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangeComponent } from './auth/change/change.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { SidebarComponent } from './layout/default/components/sidebar/sidebar.component';
import { TopbarComponent } from './layout/default/components/topbar/topbar.component';
import { DefaultComponent } from './layout/default/default.component';
import { HeaderComponent } from './layout/landing-page/components/header/header.component';
import { PtChartComponent } from './layout/landing-page/components/pt-chart/pt-chart.component';
import { WorldChartComponent } from './layout/landing-page/components/world-chart/world-chart.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { UsersComponent } from './pages/users/users.component';


@NgModule({
	declarations: [
		AppComponent,

		// Landing Page
		LandingPageComponent,
		PtChartComponent,
		WorldChartComponent,
		HeaderComponent,

		// Admin Panel
		TopbarComponent,
		SidebarComponent,
		DefaultComponent,
		DashboardComponent,
		PatientsComponent,
		UsersComponent,

		// Auth
		LoginComponent,
		ChangeComponent,
		ResetComponent,
	],
	imports: [
		ReactiveFormsModule,
		BrowserModule,
		HttpClientModule,
		AppMaterialModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ChartsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
