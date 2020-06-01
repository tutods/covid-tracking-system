import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CovidTestService } from './../../../services/covid-test/covid-test.service';
import { Component, OnInit } from '@angular/core';
import { CovidTest } from './../../../models/covid-test.model';

@Component({
    selector: 'app-covid-test',
    templateUrl: './covid-test.component.html',
    styleUrls: ['./covid-test.component.sass']
})
export class CovidTestComponent implements OnInit {

    result: any;

    constructor(public covidTest: CovidTestService, private http: HttpClient, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.fetchData()
    }

    fetchData() {
        const getAll = this.covidTest.getAll()

        return getAll.subscribe((data) => {
            this.result = data
        })
    }

}
