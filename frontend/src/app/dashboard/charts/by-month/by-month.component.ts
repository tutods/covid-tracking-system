import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SummaryService } from '../../../services/summary/summary.service';

@Component({
	selector: 'app-by-month',
	templateUrl: './by-month.component.html',
	styleUrls: ['./by-month.component.sass']
})
export class ByMonthComponent implements OnInit {

	lineChartData: ChartDataSets[];


	lineChartLabels: Label[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	lineChartOptions = {
		responsive: true,
	};

	lineChartColors: Color[] = [
		{
			borderColor: 'black',
			backgroundColor: 'red',
		},
	];

	lineChartLegend = true;
	lineChartType = 'line';
	lineChart = false;

	constructor(private summaryService: SummaryService) {

	}


	actualYear = (new Date()).getFullYear();
	numberOfDays = 12;
	numberOfTests: number[] = [this.numberOfDays];

	ngOnInit(): void {


		this.summaryService.getByDay().subscribe(data => {

			for (var i = 0; i < this.numberOfDays; i++) {
				this.numberOfTests[i] = 0;
			}

			data.map(element => {
				if ((new Date(element.date)).getFullYear() == this.actualYear) {
					this.numberOfTests[new Date(element.date).getMonth()] += element.numberOfTests;
				}
			});


			this.lineChartData = [
				{ data: this.numberOfTests, label: 'Number of tests this month' },
			];

			console.log(data);


			this.lineChart = true;

		})
	}



}