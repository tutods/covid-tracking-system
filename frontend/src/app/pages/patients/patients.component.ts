import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ageToDate } from 'src/app/functions/ageToDate';
import { formatDate } from '../../functions/formatDate';
import { PatientsService } from '../../services/patients/patients.service';
import { UiService } from '../../services/ui/ui.service';
import { PatientAddComponent } from './../../components/dialogs/patients/patient-add/patient-add.component';
import { PatientDeleteComponent } from './../../components/dialogs/patients/patient-delete/patient-delete.component';
import { PatientEditComponent } from './../../components/dialogs/patients/patient-edit/patient-edit.component';
import { PatientInfoComponent } from './../../components/dialogs/patients/patient-info/patient-info.component';
import { Patient } from './../../models/patient.model';
import { TitleService } from './../../services/title/title.service';

@Component({
	selector: 'app-patients',
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.sass']
})
export class PatientsComponent implements OnInit {
	public dialogSize: string = (window.innerWidth >= 1200) ? '25vw' : (window.innerWidth >= 800) ? '50vw' : '85vw'

	result: any;

	fields: Object[] = [
		{ value: 'name', view: 'Name' },
		{ value: 'birthdayDate', view: 'Birthday Date' },
		{ value: 'status', view: 'Status' },
	];

	filters: Object[] = [
		{ value: 'age', view: 'Age' },
		{ value: 'status', view: 'Status' },
		{ value: 'gender', view: 'Gender' },
	];

	orders: Object[] = [
		{ value: 'asc', view: 'Ascendent' },
		{ value: 'desc', view: 'Descendent' },
	];

	status: Object[] = [
		{ value: 'Suspect', view: 'Suspect' },
		{ value: 'Infected', view: 'Infected' },
		{ value: 'Non Infected', view: 'Non Infected' }
	];

	genders: Object[] = [
		{ value: 'Male', view: 'Male' },
		{ value: 'Female', view: 'Female' }
	];

	selectedField: string;
	selectedOrder: string;
	selectedSearchField: string;
	selectedSearchFilter: string;

	selectedSearchFilterFromAge: number;
	selectedSearchFilterToAge: number;

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
			this.result = data;
		});
	}

	fetchOrderedData() {
		const getAllWithSort = this.patients.getAllWithSort(this.selectedField, this.selectedOrder);

		return getAllWithSort.subscribe((data) => {
			this.result = data;
		});
	}

	fetchFilteredData() {
		const getAllWithFilter = this.patients.getAllWithFilter(this.selectedSearchField, this.selectedSearchFilter);

		return getAllWithFilter.subscribe((data) => {
			this.result = data;
		});
	}

	fetchFilteredDataWithDate() {
		const from = ageToDate(this.selectedSearchFilterFromAge);
		var to;
		if (this.selectedSearchFilterToAge > 0) {
			to = ageToDate(this.selectedSearchFilterToAge);
		}
		else if (this.selectedSearchFilterToAge === 0) {
			to = formatDate(new Date());
		}


		const getAllWithFilter = this.patients.getAllFilteredWithDate(to, from);

		return getAllWithFilter.subscribe((data) => {
			this.result = data;
		});
	}

	selectedSearchFieldMethod() {
		return this.selectedSearchField;
	}

	selectedSearchFilterMethod() {
		if ((this.selectedSearchField === 'status' || this.selectedSearchField === 'gender') && this.selectedSearchFilter) {
			this.fetchFilteredData();
		}
		if (this.selectedSearchField === 'age' && this.selectedSearchFilterToAge > -1) {
			this.fetchFilteredDataWithDate();
		}
	}

	selectedFieldMethod() {
		if (this.selectedOrder) {
			this.fetchOrderedData();
		}
	}

	selectedOrderMethod() {
		if (this.selectedField) {
			this.fetchOrderedData();
		}
	}

	// 	openDeleteDialog(patient: Patient) {
	// 		let dialogRef = this.dialog.open(DialogToDeleteComponent, {
	// 			width: '25vw',
	// 			data: patient
	// 		});

	// 		dialogRef.afterClosed().subscribe(res => {
	// 			if (res) {
	// 				this.uiService.showSnackBar(res.message)

	// 				if (res.status == true)
	// 					this.fetchData()
	// 			}
	// 		})

	// 	}

	// 	openInformationDialog(patient: Patient) {

	// 		this.dialog.open(CovidTestInformationComponent, {
	// 			data: patient,
	// 			width: '25vw'
	// 		});
	// 	}

	// 	openEditDialog(patient: Patient) {

	// 		let dialogRef = this.dialog.open(CovidTestEditComponent, {
	// 			data: patient,
	// 			width: '25vw',
	// 		});

	// 		dialogRef.afterClosed().subscribe((data) => {
	// 			if (data) {
	// 				this.uiService.showSnackBar(data.message)

	// 				if (data.status == true)
	// 					this.fetchData()
	// 			}
	// 		})
	// 	}

	// 	openCreateDialog() {
	// 		const dialogRef = this.dialog.open(CreateDialogComponent, {
	// 			width: '25vw'
	// 		});

	// 		dialogRef.afterClosed().subscribe((data) => {
	// 			if (data) {
	// 				this.uiService.showSnackBar(data.message)

	// 				if (data.status == true)
	// 					this.fetchData()
	// 			}
	// 		})
	// 	}
	// =======
	// 		return getAll.subscribe((data) => {
	// 			this.result = data
	// 		})
	// 	}

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

