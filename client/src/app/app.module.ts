import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangeComponent } from './auth/change/change.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ByDayComponent } from './components/charts/by-day/by-day.component';
import { ByGenderComponent } from './components/charts/by-gender/by-gender.component';
import { ByMonthComponent } from './components/charts/by-month/by-month.component';
import { ByStatusComponent } from './components/charts/by-status/by-status.component';
import { BySymptomsComponent } from './components/charts/by-symptoms/by-symptoms.component';
import { PtChartComponent } from './components/charts/pt-chart/pt-chart.component';
import { WorldChartComponent } from './components/charts/world-chart/world-chart.component';
import { CovidTestCreateComponent } from './components/dialogs/covid-test/covid-test-create/covid-test-create.component';
import { CovidTestDeleteComponent } from './components/dialogs/covid-test/covid-test-delete/covid-test-delete.component';
import { CovidTestEditComponent } from './components/dialogs/covid-test/covid-test-edit/covid-test-edit.component';
import { CovidTestInformationComponent } from './components/dialogs/covid-test/covid-test-information/covid-test-information.component';
import { DataByEmailComponent } from './components/dialogs/data-by-email/data-by-email.component';
import { PatientAddComponent } from './components/dialogs/patients/patient-add/patient-add.component';
import { PatientDeleteComponent } from './components/dialogs/patients/patient-delete/patient-delete.component';
import { PatientEditComponent } from './components/dialogs/patients/patient-edit/patient-edit.component';
import { PatientInfoComponent } from './components/dialogs/patients/patient-info/patient-info.component';
import { UpdatePasswordComponent } from './components/dialogs/users/update-password/update-password.component';
import { UserAddComponent } from './components/dialogs/users/user-add/user-add.component';
import { UserDeleteComponent } from './components/dialogs/users/user-delete/user-delete.component';
import { UserEditComponent } from './components/dialogs/users/user-edit/user-edit.component';
import { UserInfoComponent } from './components/dialogs/users/user-info/user-info.component';
import { CanUseDirective } from './directives/can-use/can-use.directive';
import { RoleEnableDirective } from './directives/role-enable/role-enable.directive';
import { ScopeGuard } from './guards/scope/scope.guard';
import { SessionLostInterceptor } from './interceptors/session-lost.interceptor';
import { AuthComponent } from './layout/auth/auth.component';
import { SidebarComponent } from './layout/default/components/sidebar/sidebar.component';
import { TopbarComponent } from './layout/default/components/topbar/topbar.component';
import { DefaultComponent } from './layout/default/default.component';
import { HeaderComponent } from './layout/landing-page/components/header/header.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { CovidTestComponent } from './pages/covid-test/covid-test.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,

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
		UpdatePasswordComponent,
		PatientDeleteComponent,
		PatientInfoComponent,
		PatientEditComponent,
		PatientAddComponent,

		// Auth
		LoginComponent,
		ChangeComponent,
		ResetComponent,

		PatientDeleteComponent,
		PatientInfoComponent,
		PatientEditComponent,
		PatientAddComponent,
		CanUseDirective,
		ByStatusComponent,
		ByDayComponent,
		ByMonthComponent,
		BySymptomsComponent,

		// Directives
		CanUseDirective,
		RoleEnableDirective,
		PatientEditComponent,
		PatientAddComponent,
		CovidTestComponent,
		CovidTestCreateComponent,
		CovidTestDeleteComponent,
		CovidTestEditComponent,
		CovidTestInformationComponent,
		ByGenderComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		MatIconModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ChartsModule,
		MatInputModule,
		MatButtonModule,
		MatSidenavModule,
		MatToolbarModule,
		MatCardModule,
		MatMenuModule,
		MatGridListModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		MatFormFieldModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MatListModule,
		FlexLayoutModule,
		MatDialogModule,
		BrowserAnimationsModule,
		MatTooltipModule,
		MatDatepickerModule,
		DragDropModule,
		MatAutocompleteModule,
		MatBadgeModule,
		MatBottomSheetModule,
		MatButtonToggleModule,
		MatChipsModule,
		MatStepperModule,
		MatDividerModule,
		MatExpansionModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSortModule,
		MatTableModule,
		MatTreeModule,
		ScrollingModule,
		Ng2SearchPipeModule
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
