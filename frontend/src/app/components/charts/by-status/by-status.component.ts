import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { SummaryService } from '../../../services/summary/summary.service';


@Component({
	selector: 'app-by-status',
	templateUrl: './by-status.component.html',
	styleUrls: ['./by-status.component.sass']
})
export class ByStatusComponent implements OnInit {
	// Chart Options
	public chartOptions: (ChartOptions) = {
		legend: {
			display: false,
			labels: {
				fontColor: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "white" : "black"
			}
		},
		responsive: true,
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true,
					stepSize: 1,
					fontColor: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "white" : "black",
				},
				gridLines: {
				}
			}],
			xAxes: [{
				ticks: {
					fontColor: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "white" : "black",
				},
				gridLines: {
					display: false,
					color: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "white" : "black",
				},
			}],
		},
	}

	// Chart Labels
	public chartLabels: Label[];

	// Chart Type
	public chartType: ChartType = "bar";

	// Chart Colors
	public chartColors = [
		{
			borderColor: '#146eb4',
			backgroundColor: '#0099cc',
		}
	];

	// Chart Data
	public chartData;

	// Chart Status
	public chartReady = false;

	constructor(private summaryService: SummaryService) { }

	ngOnInit(): void {

		this.summaryService.getByStatus().subscribe((data) => {

			let dataLabels = []
			let dataValues = []

			data.map(element => {
				dataLabels.push(element.status)
				dataValues.push(element.count)
			});

			this.chartData = [{ data: dataValues, label: 'Number of status', borderColor: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "white" : "black" }];
			this.chartLabels = dataLabels;

			this.chartReady = true;

		})
	}

	// ngOnInit(): void {
	// 	this.summaryService.getByStatus().subscribe((data) => {
	// 		console.log(data)
	// 		data.map(element => {
	// 			this.chartLabels.push(element.status)
	// 			this.chartData.push(element.count)
	// 		});

	// 		this.chartReady = true;
	// 	})
	// }

}
