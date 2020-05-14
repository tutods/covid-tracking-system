import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		NavigationComponent,
		DashboardComponent,
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
