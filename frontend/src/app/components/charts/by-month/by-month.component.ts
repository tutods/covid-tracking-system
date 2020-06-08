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

	public chartData: ChartDataSets[];
	public chartLabels: Label[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	public chartOptions: ChartOptions = {
		legend: {
			display: false,
			labels: {
				fontColor: window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'white'
					: 'black',
			},
		},
		responsive: true,
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
						stepSize: 1,
						fontColor: window.matchMedia('(prefers-color-scheme: dark)').matches
							? 'white'
							: 'black',
					},
					gridLines: {},
				},
			],
			xAxes: [
				{
					ticks: {
						display: true,
						fontColor: window.matchMedia('(prefers-color-scheme: dark)').matches
							? 'white'
							: 'black',
					},
					gridLines: {
						display: false,
						color: window.matchMedia('(prefers-color-scheme: dark)').matches
							? 'white'
							: 'black',
					},
				},
			],
		},
	};

	public chartColors = [
		{
			backgroundColor: '#56a0d3',
			borderColor: '#56a0d3',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'white'
				: 'black',
			pointHoverBackgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'white'
				: 'black',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		},
	];

	public chartLegend = true;
	public chartType = 'line';
	public chart = false;


	constructor(private summaryService: SummaryService) {
	}

	ngOnInit(): void {

		const actualYear = new Date().getFullYear()
		const numberOfMonths = 12;
		const numberOfTests: number[] = [numberOfMonths];

		this.summaryService.getByDay().subscribe(data => {

			for (var i = 0; i < numberOfMonths; i++) {
				numberOfTests[i] = 0;
			}

			data.map(element => {
				if ((new Date(element.date)).getFullYear() == actualYear) {
					numberOfTests[new Date(element.date).getMonth()] += element.numberOfTests;
				}
			});

			this.chartData = [
				{ data: numberOfTests, label: 'Number of COVID Tests by Month' },
			];

			this.chart = true;

		})
	}



}