import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Charts
import { ChartsModule } from 'ng2-charts';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangeComponent } from './auth/change/change.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
// Dialogs - Patients
import { CreateDialogComponent } from './components/dialogs/patients/create-dialog/create-dialog.component';
import { DialogToDeleteComponent } from './components/dialogs/patients/dialog-to-delete/dialog-to-delete.component';
import { EditDialogComponent } from './components/dialogs/patients/edit-dialog/edit-dialog.component';
import { InformationDialogComponent } from './components/dialogs/patients/information-dialog/information-dialog.component';
import { UserAddComponent } from './components/dialogs/users/user-add/user-add.component';
import { UserDeleteComponent } from './components/dialogs/users/user-delete/user-delete.component';
import { UserEditComponent } from './components/dialogs/users/user-edit/user-edit.component';
import { UserInfoComponent } from './components/dialogs/users/user-info/user-info.component';
import { DataByEmailComponent } from './data-by-email/data-by-email.component';
import { CanUseDirective } from './directives/can-use/can-use.directive';
import { EnableMenuDirective } from './directives/enable-menu/enable-menu.directive';
import { ScopeGuard } from './guards/scope/scope.guard';
//Interceptor
import { SessionLostInterceptor } from './interceptors/session-lost.interceptor';
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
		DataByEmailComponent,

		// Admin Panel
		TopbarComponent,
		SidebarComponent,
		DefaultComponent,
		DashboardComponent,
		PatientsComponent,
		UsersComponent,

		// Dialogs
		UserEditComponent,
		UserDeleteComponent,
		UserInfoComponent,
		UserAddComponent,

		// Auth
		LoginComponent,
		ChangeComponent,
		ResetComponent,
		DialogToDeleteComponent,
		InformationDialogComponent,
		EditDialogComponent,
		CreateDialogComponent,
		CanUseDirective,
		EnableMenuDirective
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		BrowserModule,
		HttpClientModule,
		AppMaterialModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ChartsModule
	],
	providers: [
		ScopeGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: SessionLostInterceptor,
			multi: true
		},

	],
	bootstrap: [AppComponent]
})
export class AppModule { }