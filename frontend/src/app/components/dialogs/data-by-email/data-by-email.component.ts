import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PatientsService } from '../../../services/patients/patients.service';

@Component({
	selector: 'app-data-by-email',
	templateUrl: './data-by-email.component.html',
	styleUrls: ['./data-by-email.component.sass']
})
export class DataByEmailComponent implements OnInit {

	emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";
	getDataForm: FormGroup;

	constructor(public router: Router, private snackBar: MatSnackBar, private fBuild: FormBuilder, public patientsService: PatientsService) { }

	ngOnInit(): void {
		this.getDataForm = this.fBuild.group({
			'email': ['', [
				Validators.required,
				Validators.email,
				Validators.pattern(this.emailPattern)
			]],
			'phoneNumber': ['', [Validators.required, Validators.minLength(9)]],
			'patientNumber': ['', [Validators.required, Validators.minLength(9)]]
		});
	}

	// To disable button if have errors
	get getDataFormControl() {
		return this.getDataForm.controls;
	}

	openSnackBar(message: string) {
		this.snackBar.open(message, 'Close', { duration: 5000 })
	}

	onSubmit(evt) {
		// Prevent Default
		evt.preventDefault();

		this.patientsService
			.getDataByEmail(this.getDataForm.get('email').value, this.getDataForm.get('phoneNumber').value, this.getDataForm.get('patientNumber').value)
			.subscribe(
				(patient) => {
					this.openSnackBar('Email sent with success!')
				},
				(error) => {
					this.openSnackBar(error.error.message || "Invalid data");
				}
			)
	}

}
