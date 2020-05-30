import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
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
	MatDialogModule,
	BrowserAnimationsModule,
	BrowserModule,
	MatTooltipModule,
	MatDatepickerModule,
	A11yModule,
	ClipboardModule,
	CdkStepperModule,
	CdkTableModule,
	CdkTreeModule,
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
	PortalModule,
	ScrollingModule,
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
