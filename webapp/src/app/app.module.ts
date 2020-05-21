import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material Module Imports
import { AppMaterialModule } from './app-material/app-material.module';
// Routing Module
import { AppRoutingModule } from './app-routing.module';
// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './components/Layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ChangeComponent } from './auth/change/change.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		LayoutComponent,
		DashboardComponent,
		PatientsComponent,
		ResetComponent,
		ChangeComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppMaterialModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		LayoutModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
