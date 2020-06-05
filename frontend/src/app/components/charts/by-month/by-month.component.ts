import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { SummaryService } from '../../../services/summary/summary.service';

@Component({
	selector: 'app-by-month',
	templateUrl: './by-month.component.html',
	styleUrls: ['./by-month.component.sass']
})
export class ByMonthComponent implements OnInit {

	lineChartData: ChartDataSets[];
	lineChartLabels: Label[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// lineChartOptions = {
	// 	responsive: true,
	// };

	public lineChartOptions: (ChartOptions) = {
		responsive: true,
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true,
					stepSize: 1
				}
			}],
			xAxes: [{
				gridLines: {
					display: false
				}
			}],
		},
	}

	lineChartColors = [
		{ // grey
			backgroundColor: 'rgba(148,159,177,0.2)',
			borderColor: 'rgba(148,159,177,1)',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
	];

	lineChartLegend = true;
	lineChartType = 'line';
	lineChart = false;


	constructor(private summaryService: SummaryService) {
	}

	actualYear = (new Date()).getFullYear();
	numberOfMonths = 12;
	numberOfTests: number[] = [this.numberOfMonths];

	ngOnInit(): void {

		this.summaryService.getByDay().subscribe(data => {

			for (var i = 0; i < this.numberOfMonths; i++) {
				this.numberOfTests[i] = 0;
			}

			data.map(element => {
				if ((new Date(element.date)).getFullYear() == this.actualYear) {
					this.numberOfTests[new Date(element.date).getMonth()] += element.numberOfTests;
				}
			});

			this.lineChartData = [
				{ data: this.numberOfTests, label: 'Number of tests by month' },
			];


			this.lineChart = true;

		})
	}



}