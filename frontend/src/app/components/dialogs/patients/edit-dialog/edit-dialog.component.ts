import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../../../../models/patient.model';
import { PatientsService } from '../../../../services/patients/patients.service';

@Component({
	selector: 'app-edit-dialog',
	templateUrl: './edit-dialog.component.html',
	styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent implements OnInit {
	// startDate = new Date(1990, 0, 1);

	// Default Status
	status: string[] = ['Suspect', 'Infected', 'Non Infected'];

	// Default Symptoms
	symptoms: string[] = ['cough',
		'fever',
		'shortness of breathe',
		'lack of smell',
		'lack of taste',
		'tiredness',
		'headaches',
		'diarrhea'
	];

	// Default Observations
	observations: object[] = [
		{ value: 'saude24', label: "Saúde 24" },
		{ value: 'riskGroup', label: "Rizk Group" },
		{ value: 'riskZone', label: "Risk Zone" }
	];

	currentSymptoms = new FormControl();
	currentObservations = new FormControl();
	realForm: FormGroup;
	patient: Patient;
	date;
	data: Patient;

	patientForm: FormGroup

	emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

	constructor(private formBuilder: FormBuilder, public patients: PatientsService,
		public dialogRef: MatDialogRef<EditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) data) {
		this.patient = data
	}

	ngOnInit(): void {

		this.patientForm = this.formBuilder.group({
			'name': [this.patient.name, [
				Validators.required
			]],
			'birthdayDate': [new Date(this.patient.birthdayDate), [
				Validators.required,
			]],
			'patientNumber': [this.patient.patientNumber, [
				Validators.required,
			]],
			'status': [this.patient.status, [
				Validators.required,
			]],
			'phone': [this.patient.contacts.phone, [
				Validators.required,
			]],
			'email': [this.patient.contacts.email, [
				Validators.required,
				Validators.email,
				Validators.pattern(this.emailPattern)
			]],
			'symptoms': [this.patient.symptoms, [
				Validators.required,
			]],
			'observations': [this.patient.observations, [
				Validators.required,
			]],
		})
	}


	save() {
		const formDate = new Date(this.patientForm.get('birthdayDate').value)

		const formData = {
			name: this.patientForm.get('name').value,
			birthdayDate: new Date(`${formDate.getFullYear()}-${formDate.getMonth() + 1}-${formDate.getDate()}`),
			patientNumber: this.patientForm.get('patientNumber').value,
			status: this.patientForm.get('status').value,
			contacts: {
				phone: this.patientForm.get('phone').value,
				email: this.patientForm.get('email').value,
			},
			symptoms: this.patientForm.get('symptoms').value,
			observations: this.patientForm.get('observations').value,
		}

		this.patients.getOneAndUpdate(this.patient._id, formData).subscribe();
		this.dialogRef.close()
	}

	onClose(): void {
		this.dialogRef.close();
	}
}