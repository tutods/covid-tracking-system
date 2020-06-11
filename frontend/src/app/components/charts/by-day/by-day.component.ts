import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { SummaryService } from '../../../services/summary/summary.service';

@Component({
	selector: 'app-by-day',
	templateUrl: './by-day.component.html',
	styleUrls: ['./by-day.component.sass']
})
export class ByDayComponent implements OnInit {

	chartData: ChartDataSets[];
	chartLabels: number[] = [];

	public chartOptions: ChartOptions = {
		tooltips: {
			enabled: true,
			mode: 'single',
			callbacks: {
				title: function (tooltipItem, data) {
					return `Day ${data.labels[tooltipItem[0].index]}`;
				}
			}
		},
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
			pointBackgroundColor: '#56a0d3',
			pointBorderColor: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'white'
				: 'black',
			pointHoverBackgroundColor: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'white'
				: 'black',
			pointHoverBorderColor: '#56a0d3'
		},
	];

	public chartLegend = true;
	public chartType = 'line';
	public chart = false;

	constructor(private summaryService: SummaryService) { }

	daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}


	ngOnInit(): void {
		const actualMonth = (new Date().getMonth() + 1);
		const actualYear = (new Date()).getFullYear();
		const numberOfDays = this.daysInMonth(actualMonth, actualYear);
		const numberOfTests: number[] = [numberOfDays];

		this.summaryService.getByDay().subscribe(data => {
			if (data.length > 0) {
				for (var i = 0; i < numberOfDays; i++) {
					numberOfTests[i] = 0;
				}

				data.map((element) => {
					if ((new Date(element.date).getMonth() + 1) == actualMonth && (new Date(element.date)).getFullYear() == actualYear) {
						numberOfTests[(new Date(element.date).getDate()) - 1] += element.numberOfTests
					}
				})

				this.chartData = [
					{ data: numberOfTests, label: 'Number of COVID Tests' },
				];

				for (i = 1; i <= numberOfDays; i++) {
					this.chartLabels.push(i)
				}

				this.chart = true;
			} else {
				this.chart = false;
			}


		})
	}

}
