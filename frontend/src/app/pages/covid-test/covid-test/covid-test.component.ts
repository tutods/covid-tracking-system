import { CovidTestEditDialogComponent } from './../../../components/dialogs/covid-test/covid-test-edit-dialog/covid-test-edit-dialog.component';
import { CovidTestInformationDialogComponent } from './../../../components/dialogs/covid-test/covid-test-information-dialog/covid-test-information-dialog.component';
import { CovidTestDeleteDialogComponent } from './../../../components/dialogs/covid-test/covid-test-delete-dialog/covid-test-delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CovidTestService } from './../../../services/covid-test/covid-test.service';
import { Component, OnInit } from '@angular/core';
import { CovidTest } from './../../../models/covid-test.model';
import { CovidTestCreateDialogComponent } from '../../../components/dialogs/covid-test/covid-test-create-dialog/covid-test-create-dialog.component';
import { formatDate } from '../../../functions/formatDate';

@Component({
    selector: 'app-covid-test',
    templateUrl: './covid-test.component.html',
    styleUrls: ['./covid-test.component.sass']
})

export class CovidTestComponent implements OnInit {
    result: any;

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

    constructor(public covidTests: CovidTestService, private http: HttpClient, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        const getAll = this.covidTests.getAll()

        return getAll.subscribe((data) => {
            this.result = data;
        });
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
        const dialogRef = this.dialog.open(CovidTestCreateDialogComponent);

        dialogRef.afterClosed().subscribe((data) => {
            this.fetchData();
        });
    }
    openDeleteDialog(covidTest: CovidTest) {
        let dialogRef = this.dialog.open(CovidTestDeleteDialogComponent);

        dialogRef.afterClosed().subscribe(res => {
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
            this.fetchData();
        })
    }
}
