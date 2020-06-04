import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../../components/dialogs/patients/create-dialog/create-dialog.component';
import { DialogToDeleteComponent } from '../../components/dialogs/patients/dialog-to-delete/dialog-to-delete.component';
import { EditDialogComponent } from '../../components/dialogs/patients/edit-dialog/edit-dialog.component';
import { InformationDialogComponent } from '../../components/dialogs/patients/information-dialog/information-dialog.component';
import { PatientsService } from '../../services/patients/patients.service';
import { Patient } from './../../models/patient.model';

@Component({
	selector: 'app-patients',
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.sass']
})
export class PatientsComponent implements OnInit {

	result: any

	constructor(public patients: PatientsService, private http: HttpClient, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.fetchData()
	}

	fetchData() {
		const getAll = this.patients.getAll()

		return getAll.subscribe((data) => {
			this.result = data
		})
	}

	openDeleteDialog(patient: Patient) {
		let dialogRef = this.dialog.open(DialogToDeleteComponent, {
			width: '25vw',
			data: patient
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res === "true") {
				this.fetchData()
			}
		})
	}
	openInformationDialog(patient: Patient) {

		this.dialog.open(InformationDialogComponent, {
			data: patient,
			width: '25vw'
		});
	}

	openEditDialog(patient: Patient) {

		let dialogRef = this.dialog.open(EditDialogComponent, {
			data: patient,
			width: '25vw',
		});

		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.fetchData()
			}
		})
	}

	openCreateDialog() {
		const dialogRef = this.dialog.open(CreateDialogComponent, {
			width: '25vw'
		});

		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.fetchData()
			}
		})
	}
}

