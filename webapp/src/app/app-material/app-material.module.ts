import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


const Components = [
	MatInputModule,
	MatButtonModule,
	MatSidenavModule,
	MatToolbarModule,
	MatIconModule,
	MatCardModule,
	MatMenuModule,
	MatGridListModule
];


@NgModule({
	exports: [
		Components
	],
	imports: [
		Components,
		CommonModule
	]
})
export class AppMaterialModule { }
