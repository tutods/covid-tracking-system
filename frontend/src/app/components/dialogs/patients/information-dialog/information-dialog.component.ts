import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../../../../models/patient.model';

@Component({
	selector: 'app-information-dialog',
	templateUrl: './information-dialog.component.html',
	styleUrls: ['./information-dialog.component.sass']
})
export class InformationDialogComponent implements OnInit {
	patient: Patient;
	bDate: string;
	symptoms: [];
	observations: any;

	constructor(public dialogRef: MatDialogRef<InformationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) data) {
		this.patient = data;
		this.bDate = new Date(this.patient.birthdayDate).toLocaleDateString();
		this.symptoms = data.symptoms;
		this.observations = data.observations.map((element) => {
			return element.split(/(?=[A-Z])/).join(' ')
		})
	}
	ngOnInit(): void {
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
