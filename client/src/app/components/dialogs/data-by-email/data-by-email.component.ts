import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientsService } from '../../../services/patients/patients.service';
import { UiService } from '../../../services/ui/ui.service';

@Component({
	selector: 'app-data-by-email',
	templateUrl: './data-by-email.component.html',
	styleUrls: ['./data-by-email.component.sass']
})
export class DataByEmailComponent implements OnInit {

	emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";
	getDataForm: FormGroup;

	constructor(
		public router: Router,
		private fBuild: FormBuilder,
		public patientsService: PatientsService,
		private uiService: UiService,
		public dialogRef: MatDialogRef<DataByEmailComponent>
	) { }

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

	onSubmit(evt) {
		// Prevent Default
		evt.preventDefault();

		if (this.getDataForm.valid) {

			const email = this.getDataForm.get('email').value
			const phoneNumber = this.getDataForm.get('phoneNumber').value
			const patientNumber = this.getDataForm.get('patientNumber').value

			this.patientsService
				.getDataByEmail(email, phoneNumber, patientNumber)
				.subscribe(
					(success) => {
						this.dialogRef.close({ message: success.message })
					},
					(error) => {
						this.dialogRef.close({ message: error.error.message })

					}
				)
		} else {
			this.uiService.showSnackBar("Please validate all fields on form and try again.")
		}
	}

	onClose() {
		this.dialogRef.close()
	}

}
