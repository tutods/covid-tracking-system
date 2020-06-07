import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CovidTestCreateDialogComponent } from '../../components/dialogs/covid-test/covid-test-create-dialog/covid-test-create-dialog.component';
import { CovidTestDeleteDialogComponent } from '../../components/dialogs/covid-test/covid-test-delete-dialog/covid-test-delete-dialog.component';
import { CovidTestEditDialogComponent } from '../../components/dialogs/covid-test/covid-test-edit-dialog/covid-test-edit-dialog.component';
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
		const dialogRef = this.dialog.open(CovidTestCreateDialogComponent);

		dialogRef.afterClosed().subscribe((data) => {
			this.fetchData();
		})
	}
	openDeleteDialog(covidTest: CovidTest) {
		let dialogRef = this.dialog.open(CovidTestDeleteDialogComponent);

		dialogRef.afterClosed().subscribe(res => {
			console.log(covidTest._id)
			if (res === "true") {
				this.covidTests.getOneAndDelete(covidTest._id).subscribe(() => window.location.reload());
			}
		})
	}
	openInformationDialog(covidTest: CovidTest) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.data = covidTest;

		this.dialog.open(CovidTestInformationDialogComponent, dialogConfig);
	}
	openEditDialog(covidTest: any) {
		const dialogConfig = new MatDialogConfig();

		dialogConfig.data = covidTest;

		let dialogRef = this.dialog.open(CovidTestEditDialogComponent, dialogConfig);

		dialogRef.afterClosed().subscribe((data) => {
			console.log(data);
			this.fetchData();
		})
	}
}
