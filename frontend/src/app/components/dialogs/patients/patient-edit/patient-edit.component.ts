import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../../../../models/patient.model';
import { PatientsService } from '../../../../services/patients/patients.service';

@Component({
	selector: 'app-patient-edit',
	templateUrl: './patient-edit.component.html',
	styleUrls: ['./patient-edit.component.sass']
})
export class PatientEditComponent implements OnInit {
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
	allObservationsArr: object[] = [
		{ value: 'saude24', label: "Saúde 24" },
		{ value: 'riskGroup', label: "Risk Group" },
		{ value: 'riskZone', label: "Risk Zone" }
	];

	// current observations selected
	currentObservations = [];

	// observations object to update
	observationsToUpdate = {
		saude24: false,
		riskGroup: false,
		riskZone: false,
	};

	// patient to edit
	patient: Patient;

	// Form of the edit dialog
	patientForm: FormGroup;

	emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

	//checks wich observations are in the database and returns them
	checkRealObservations(elements) {
		let observationsArr = new Array()

		if (elements.saude24) {
			observationsArr.push("saude24");
		}
		if (elements.riskGroup) {
			observationsArr.push("riskGroup");
		}
		if (elements.riskZone) {
			observationsArr.push("riskZone");
		}

		return observationsArr;
	}

	constructor(
		private formBuilder: FormBuilder,
		public patients: PatientsService,
		public dialogRef: MatDialogRef<PatientEditComponent>,
		@Inject(MAT_DIALOG_DATA) data
	) {
		this.patient = data;
		this.currentObservations = this.checkRealObservations(data.observations);
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
				Validators.min(100000000),
				Validators.max(999999999)
			]],
			'status': [this.patient.status, [
				Validators.required,
			]],
			'phone': [this.patient.contacts.phone, [
				Validators.required,
				Validators.min(100000000),
				Validators.max(999999999)
			]],
			'email': [this.patient.contacts.email, [
				Validators.required,
				Validators.email,
				Validators.pattern(this.emailPattern)
			]],
			'symptoms': [this.patient.symptoms, []],
			'observations': [this.currentObservations, []],
			"gender": [this.patient.gender, [Validators.required]]
		})

	}

	get patientFormControl() {
		return this.patientForm.controls;
	}


	// Submit Method
	onSubmit(evt) {
		// Prevent Default
		evt.preventDefault();
		const formDate = new Date(this.patientForm.get('birthdayDate').value)

		this.currentObservations = this.patientForm.get('observations').value;

		for (let element in this.currentObservations) {
			if (this.currentObservations[element] === 'saude24') {
				this.observationsToUpdate.saude24 = true;
			}
			if (this.currentObservations[element] === 'riskGroup') {
				this.observationsToUpdate.riskGroup = true;
			}
			if (this.currentObservations[element] === 'riskZone') {
				this.observationsToUpdate.riskZone = true;
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
			symptoms: this.patientForm.get('symptoms').value,
			observations: this.observationsToUpdate,
			gender: this.patientForm.get('gender').value
		}

		this.patients.getOneAndUpdate(this.patient._id, formData).subscribe((success) => {
			this.dialogRef.close({
				status: true,
				message: "Patient edited with success!"
			})
		}, (error) => {
			let codeMessage = error.error.message.errmsg || error.error.message;
			console.log(codeMessage)
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

		this.dialogRef.close()
	}

	onClose(): void {
		this.dialogRef.close();
	}
}