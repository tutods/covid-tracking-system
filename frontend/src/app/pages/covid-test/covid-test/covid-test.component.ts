import { CovidTestInformationDialogComponent } from './../../../components/dialogs/covid-test/covid-test-information-dialog/covid-test-information-dialog.component';
import { CovidTestDeleteDialogComponent } from './../../../components/dialogs/covid-test/covid-test-delete-dialog/covid-test-delete-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CovidTestService } from './../../../services/covid-test/covid-test.service';
import { Component, OnInit } from '@angular/core';
import { CovidTest } from './../../../models/covid-test.model';
import { CovidTestCreateDialogComponent } from '../../../components/dialogs/covid-test/covid-test-create-dialog/covid-test-create-dialog.component';

@Component({
    selector: 'app-covid-test',
    templateUrl: './covid-test.component.html',
    styleUrls: ['./covid-test.component.sass']
})
export class CovidTestComponent implements OnInit {

    result: any;

    constructor(public covidTests: CovidTestService, private http: HttpClient, public dialog: MatDialog) { }

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
}
