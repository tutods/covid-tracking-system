import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { Patient } from './../../../../models/patient.model';

@Component({
	selector: 'app-dialog-to-delete',
	templateUrl: './dialog-to-delete.component.html',
	styleUrls: ['./dialog-to-delete.component.sass']
})
export class DialogToDeleteComponent implements OnInit {
	patient: Patient

	constructor(
		private patientService: PatientsService,
		public dialogRef: MatDialogRef<DialogToDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Patient
	) {
		this.patient = data
	}

	ngOnInit(): void {
	}

	onDelete() {
		let response: object = {}

		this.patientService.getOneAndDelete(this.patient._id).subscribe(() => {
			response["message"] = "Patient deleted with success!"
			response["status"] = true
		}, (error) => {
			let codeMessage = error.error.message

			response["message"] = codeMessage
			response["status"] = false
		})

		this.dialogRef.close(response)
	}

	onClose() {
		this.dialogRef.close()
	}

}
