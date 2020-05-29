import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
		let dialogRef = this.dialog.open(DialogToDeleteComponent);

		dialogRef.afterClosed().subscribe(res => {
			if (res === "true") {
				this.patients.getOneAndDelete(patient._id).subscribe(() => window.location.reload());
			}
		})
	}
	openInformationDialog(patient: Patient) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.data = patient;

		this.dialog.open(InformationDialogComponent, dialogConfig);
	}

	openEditDialog(patient: Patient) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.data = patient;

		let dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.result = res
				this.patients.getOneAndUpdate(patient._id, this.result).subscribe(() => window.location.reload());
				console.log(res)
			}
		})
	}
}

