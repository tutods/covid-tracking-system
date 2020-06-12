import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../../../models/patient.model';
import { PatientsService } from '../../../../services/patients/patients.service';
import { UiService } from './../../../../services/ui/ui.service';

@Component({
	selector: 'app-patient-add',
	templateUrl: './patient-add.component.html',
	styleUrls: ['./patient-add.component.sass']
})
export class PatientAddComponent implements OnInit {
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
		{ value: 'riskGroup', label: "Risk Group" },
		{ value: 'riskZone', label: "Risk Zone" }
	];

	private observationsToCreate = {
		saude24: false,
		riskGroup: false,
		riskZone: false,
	};

	currentObservations: any;

	patient: Patient;

	patientForm: FormGroup

	emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

	constructor(
		private formBuilder: FormBuilder,
		public patients: PatientsService,
		private uiService: UiService,
		public dialogRef: MatDialogRef<PatientAddComponent>
	) { }


	ngOnInit(): void {

		this.patientForm = this.formBuilder.group({
			'name': ['', [
				Validators.required
			]],
			'birthdayDate': ['', [
				Validators.required,
			]],
			'patientNumber': ['', [
				Validators.required,
				Validators.min(100000000), // Min value
				Validators.max(999999999) // Max value
			]],
			'status': ['', [
				Validators.required,
			]],
			'phone': ['', [
				Validators.required,
				Validators.min(100000000),
				Validators.max(999999999)
			]],
			'email': ['', [
				Validators.required,
				Validators.email,
				Validators.pattern(this.emailPattern)
			]],
			'symptoms': ['', []],
			'observations': ['', []],
			"gender": ['', [Validators.required]]
		})
	}

	get patientFormControl() {
		return this.patientForm.controls;
	}

	onSubmit(evt) {
		// Prevent duplicate submit of form
		evt.preventDefault()

		if (this.patientForm.valid) {

			const formDate = new Date(this.patientForm.get('birthdayDate').value)
			this.currentObservations = this.patientForm.get('observations').value;

			for (let element in this.currentObservations) {
				if (this.currentObservations[element] === 'saude24') {
					this.observationsToCreate.saude24 = true;
				}
				if (this.currentObservations[element] === 'riskGroup') {
					this.observationsToCreate.riskGroup = true;
				}
				if (this.currentObservations[element] === 'riskZone') {
					this.observationsToCreate.riskZone = true;
				}
			}

			const formData = {
				name: this.patientForm.get('name').value,
				birthdayDate: new Date(`${formDate.getFullYear()}-${formDate.getMonth() + 1}-${formDate.getDate()}`),
				patientNumber: this.patientForm.get('patientNumber').value,
				status: this.patientForm.get('status').value,
				contacts: {
					phone: this.patientForm.get('phone').value,
					email: this.patientForm.get('email').value,
				},
				symptoms: this.patientForm.get('symptoms').value || undefined,
				observations: this.observationsToCreate,
				gender: this.patientForm.get('gender').value
			}
			this.patients.create(formData).subscribe((success) => {
				this.dialogRef.close({
					status: true,
					message: "Patient created with success!"
				})
			}, (error) => {
				let codeMessage = error.error.message.errmsg || error.error.message;

				if (codeMessage.includes('E11000')) {
					if (codeMessage.includes('phone:')) {
						codeMessage = 'Phone inserted already exists';
					} else if (codeMessage.includes('patientNumber:')) {
						codeMessage = 'Patient number inserted already exists';
					} else {
						codeMessage = 'Unique error. Please validate all fields!';
					}
				} else {
					codeMessage = error.error.message
				}

				this.dialogRef.close({
					status: false,
					message: codeMessage
				})
			});
		} else {
			this.uiService.showSnackBar("Please validate all fields on form and try again.")
		}
	}

	onClose(): void {
		this.dialogRef.close();
	}
}