import { NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
	declarations: [
		AppComponent,
		LoginComponent
	],
	imports: [
		AppMaterialModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		// FlexLayoutModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
