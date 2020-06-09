import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CovidTest } from '../../../../models/covid-test.model';
import { PatientInfoComponent } from '../../patients/patient-info/patient-info.component';

@Component({
	selector: 'app-covid-test-information',
	templateUrl: './covid-test-information.component.html',
	styleUrls: ['./covid-test-information.component.sass']
})
export class CovidTestInformationComponent implements OnInit {
	public covidTest: CovidTest;
	public scheduleDate: string;

	private dialogSize: string = (window.innerWidth >= 1200) ? '25vw' : (window.innerWidth >= 800) ? '50vw' : '85vw'

	constructor(
		public dialogRef: MatDialogRef<CovidTestInformationComponent>,
		@Inject(MAT_DIALOG_DATA) data,
		public dialog: MatDialog
	) {
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

		this.dialog.open(PatientInfoComponent, {
			data: this.covidTest.patient,
			width: this.dialogSize
		});
	}
}

