import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CovidTestCreateComponent } from '../../components/dialogs/covid-test/covid-test-create/covid-test-create.component';
import { CovidTestDeleteComponent } from '../../components/dialogs/covid-test/covid-test-delete/covid-test-delete.component';
import { CovidTestEditComponent } from '../../components/dialogs/covid-test/covid-test-edit/covid-test-edit.component';
import { CovidTestInformationDialogComponent } from '../../components/dialogs/covid-test/covid-test-information-dialog/covid-test-information-dialog.component';
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
	public dialogSize: string = (window.innerWidth >= 1200) ? '25vw' : (window.innerWidth >= 800) ? '50vw' : '85vw'
	public result: any;

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

	fetchData() {
		const getAll = this.covidTests.getAll()

		return getAll.subscribe((data) => {
			this.result = data;
		})
	}

	openCreateDialog() {
		const dialogRef = this.dialog.open(CovidTestCreateComponent, {
			width: this.dialogSize
		});

		dialogRef.afterClosed().subscribe((data) => {
			this.fetchData();
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
		this.dialog.open(CovidTestInformationDialogComponent, {
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
