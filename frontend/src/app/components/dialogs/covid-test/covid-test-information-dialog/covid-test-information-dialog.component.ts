import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CovidTest } from './../../../../models/covid-test.model';
import { PatientInfoComponent } from './../../patients/patient-info/patient-info.component';

@Component({
	selector: 'app-covid-test-information-dialog',
	templateUrl: './covid-test-information-dialog.component.html',
	styleUrls: ['./covid-test-information-dialog.component.sass']
})
export class CovidTestInformationDialogComponent implements OnInit {
	covidTest: CovidTest;
	scheduleDate: string;

	constructor(public dialogRef: MatDialogRef<CovidTestInformationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) {
		this.covidTest = data;
		this.scheduleDate = new Date(this.covidTest.date).toLocaleDateString();
	}

	ngOnInit(): void {
	}
	onClose(): void {
		this.dialogRef.close();
	}
	openInformationDialog() {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.data = this.covidTest.patient;

		this.dialog.open(PatientInfoComponent, dialogConfig);
	}
}

