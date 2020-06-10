import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CovidTestCreateComponent } from '../../components/dialogs/covid-test/covid-test-create/covid-test-create.component';
import { CovidTestDeleteComponent } from '../../components/dialogs/covid-test/covid-test-delete/covid-test-delete.component';
import { CovidTestEditComponent } from '../../components/dialogs/covid-test/covid-test-edit/covid-test-edit.component';
import { CovidTestInformationComponent } from '../../components/dialogs/covid-test/covid-test-information/covid-test-information.component';
import { formatDate } from '../../functions/formatDate';
import { CovidTest } from '../../models/covid-test.model';
import { CovidTestService } from '../../services/covid-test/covid-test.service';
import { TitleService } from './../../services/title/title.service';
import { UiService } from './../../services/ui/ui.service';

@Component({
	selector: 'app-covid-test',
	templateUrl: './covid-test.component.html',
	styleUrls: ['./covid-test.component.sass']
})
export class CovidTestComponent implements OnInit {
	dialogSize: string = (window.innerWidth >= 1200) ? '25vw' : (window.innerWidth >= 800) ? '50vw' : '85vw'
	result: any;

	searchText;

	fields: Object[] = [
		{ value: 'date', view: 'Date' },
		{ value: 'status', view: 'Status' },
		{ value: 'result', view: 'Result' }
	];

	orders: Object[] = [
		{ value: 'asc', view: 'Ascendent' },
		{ value: 'desc', view: 'Descendent' },
	];

	status: Object[] = [
		{ value: 'pending', view: 'Pending' },
		{ value: 'in Progress', view: 'In Progress' },
		{ value: 'finished', view: 'Finished' },
		{ value: 'waiting Result', view: 'Waiting Result' },
	];

	results: Object[] = [
		{ value: 'positive', view: 'Positive' },
		{ value: 'negative', view: 'Negative' },
		{ value: 'inconclusive', view: 'Inconclusive' }
	];

	selectedField: string;
	selectedOrder: string;
	selectedSearchField: string;
	selectedSearchFilter: string;
	fromDate: Date;
	toDate: Date;
	selectedSearchFilterFrom: Date;
	selectedSearchFilterTo: Date;

	constructor(
		public covidTests: CovidTestService,
		private http: HttpClient,
		public dialog: MatDialog,
		public uiService: UiService,
		private titleService: TitleService
	) {
		this.titleService.setPageTitle('COVID Tests')
	}

	ngOnInit(): void {
		this.fetchData();
	}

	dateFormated(date) {
		return formatDate(date)
	}

	fetchData() {
		const getAll = this.covidTests.getAll()

		return getAll.subscribe((data) => {
			this.result = data;
		});
	}

	clearFilters() {
		this.selectedSearchField = undefined
		this.selectedSearchFilter = undefined
		this.fetchData()
	}

	fetchOrderedData() {
		const getAllWithSort = this.covidTests.getAllWithSort(this.selectedField, this.selectedOrder);

		return getAllWithSort.subscribe((data) => {
			this.result = data;
		});
	}

	fetchFilteredData() {
		const getAllWithFilter = this.covidTests.getAllWithFilter(this.selectedSearchField, this.selectedSearchFilter);

		return getAllWithFilter.subscribe((data) => {
			this.result = data;
		});
	}

	fetchFilteredDataWithDate() {
		const from = formatDate(this.selectedSearchFilterFrom);
		const to = formatDate(this.selectedSearchFilterTo);
		const getAllWithFilter = this.covidTests.getAllFilteredWithDate(this.selectedSearchField, from, to);

		return getAllWithFilter.subscribe((data) => {
			this.result = data;
		});
	}

	selectedSearchFieldMethod() {
		return this.selectedSearchField;
	}

	selectedSearchFilterMethod() {
		if ((this.selectedSearchField === 'status' || this.selectedSearchField === 'result') && this.selectedSearchFilter) {
			this.fetchFilteredData();
		}
		if (this.selectedSearchField === 'date' && this.selectedSearchFilterFrom && this.selectedSearchFilterTo) {
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

	openCreateDialog() {
		const dialogRef = this.dialog.open(CovidTestCreateComponent, {
			width: this.dialogSize
		});

		dialogRef.afterClosed().subscribe((data) => {
			if (data) {

				if (data.status == true) {
					this.fetchData();
				}

				this.uiService.showSnackBar(data.message)
			}
		})
	}

	openDeleteDialog(covidTest: CovidTest) {
		let dialogRef = this.dialog.open(CovidTestDeleteComponent, {
			width: this.dialogSize,
			data: covidTest
		});

		dialogRef.afterClosed().subscribe(res => {

			if (res) {
				this.uiService.showSnackBar(res.message)

				if (res.status == true) {
					this.fetchData()
				}
			}
		})
	}

	openInformationDialog(covidTest: CovidTest) {
		this.dialog.open(CovidTestInformationComponent, {
			width: this.dialogSize,
			data: covidTest
		});
	}

	openEditDialog(covidTest: any) {
		let dialogRef = this.dialog.open(CovidTestEditComponent, {
			width: this.dialogSize,
			data: covidTest
		});

		dialogRef.afterClosed().subscribe((data) => {

			if (data) {
				this.uiService.showSnackBar(data.message)

				if (data.status == true) {
					this.fetchData();
				}
			}

		})
	}
}
