import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

const Components = [
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
