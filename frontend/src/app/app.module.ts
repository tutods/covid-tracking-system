import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
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
// Charts
import { ChartsModule } from 'ng2-charts';
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
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ChartsModule,
		MatInputModule,
		MatButtonModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
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
