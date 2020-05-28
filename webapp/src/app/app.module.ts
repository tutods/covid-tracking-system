import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { DialogToDeleteComponent } from './dialog-to-delete/dialog-to-delete.component';
import { InformationDialogComponent } from './information-dialog/information-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		LayoutComponent,
		DashboardComponent,
		PatientsComponent,
		DialogToDeleteComponent,
		InformationDialogComponent,
		EditDialogComponent,
    ],
    entryComponents: [DialogToDeleteComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppMaterialModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		LayoutModule,
		MatGridListModule,
		MatCardModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
