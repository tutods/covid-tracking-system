import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientAddComponent } from '../../components/dialogs/patients/patient-add/patient-add.component';
import { PatientDeleteComponent } from '../../components/dialogs/patients/patient-delete/patient-delete.component';
import { PatientEditComponent } from '../../components/dialogs/patients/patient-edit/patient-edit.component';
import { PatientInfoComponent } from '../../components/dialogs/patients/patient-info/patient-info.component';
import { PatientsService } from '../../services/patients/patients.service';
import { UiService } from '../../services/ui/ui.service';
import { Patient } from './../../models/patient.model';
import { TitleService } from './../../services/title/title.service';

@Component({
	selector: 'app-patients',
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.sass']
})
export class PatientsComponent implements OnInit {

	public result: any;

	public dialogSize: string = (window.innerWidth >= 1200) ? '25vw' : (window.innerWidth >= 800) ? '50vw' : '85vw'

	constructor(
		public patients: PatientsService,
		private http: HttpClient,
		public dialog: MatDialog,
		private uiService: UiService,
		private titleService: TitleService
	) {
		this.titleService.setPageTitle('Patients')
	}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData() {
		const getAll = this.patients.getAll()

		return getAll.subscribe((data) => {
			this.result = data
		})
	}

	openDeleteDialog(patient: Patient) {
		let dialogRef = this.dialog.open(PatientDeleteComponent, {
			width: this.dialogSize,
			data: patient
		});

		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				this.uiService.showSnackBar(res.message)

				if (res.status == true)
					this.fetchData()
			}
		})

	}
	openInformationDialog(patient: Patient) {

		this.dialog.open(PatientInfoComponent, {
			data: patient,
			width: this.dialogSize
		});
	}

	openEditDialog(patient: Patient) {

		let dialogRef = this.dialog.open(PatientEditComponent, {
			data: patient,
			width: this.dialogSize,
		});

		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.uiService.showSnackBar(data.message)

				if (data.status == true)
					this.fetchData()
			}
		})
	}

	openCreateDialog() {
		const dialogRef = this.dialog.open(PatientAddComponent, {
			width: this.dialogSize
		});

		dialogRef.afterClosed().subscribe((data) => {
			if (data) {
				this.uiService.showSnackBar(data.message)

				if (data.status == true)
					this.fetchData()
			}
		})
	}
}

