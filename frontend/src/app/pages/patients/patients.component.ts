import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientAddComponent } from '../../components/dialogs/patients/patient-add/patient-add.component';
import { PatientDeleteComponent } from '../../components/dialogs/patients/patient-delete/patient-delete.component';
import { PatientEditComponent } from '../../components/dialogs/patients/patient-edit/patient-edit.component';
import { PatientInfoComponent } from '../../components/dialogs/patients/patient-info/patient-info.component';
import { PatientsService } from '../../services/patients/patients.service';
import { Patient } from './../../models/patient.model';

@Component({
	selector: 'app-patients',
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.sass']
})
export class PatientsComponent implements OnInit {

	result: any;

	constructor(
		public patients: PatientsService,
		private http: HttpClient,
		public dialog: MatDialog,
		private snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
		this.fetchData();
	}

	openSnackBar(message: string) {
		this.snackBar.open(message, 'Close', { duration: 5000 });
	}

	fetchData() {
		const getAll = this.patients.getAll()

		return getAll.subscribe((data) => {
			this.result = data
		})
	}

	openDeleteDialog(patient: Patient) {
		let dialogRef = this.dialog.open(PatientDeleteComponent, {
			width: '25vw',
			data: patient
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.openSnackBar(res.message)

				if (res.status == true)
					this.fetchData()
			}
		})

	}
	openInformationDialog(patient: Patient) {

		this.dialog.open(PatientInfoComponent, {
			data: patient,
			width: '25vw'
		});
	}

	openEditDialog(patient: Patient) {

		let dialogRef = this.dialog.open(PatientEditComponent, {
			data: patient,
			width: '25vw',
		});

		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.openSnackBar(data.message)

				if (data.status == true)
					this.fetchData()
			}
		})
	}

	openCreateDialog() {
		const dialogRef = this.dialog.open(PatientAddComponent, {
			width: '25vw'
		});

		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.openSnackBar(data.message)

				if (data.status == true)
					this.fetchData()
			}
		})
	}
}

