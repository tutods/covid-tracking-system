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
	public chartOptions: ChartOptions = {
		legend: {
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
						display: false, //this will remove only the label
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

	// Chart Labels
	public chartLabels: Label[] = ["Status"];

	// Chart Type
	public chartType: ChartType = "bar";

	// Chart Colors
	public chartColors = [{
		pointBackgroundColor: 'rgba(148,159,177,1)',
		pointBorderColor: '#fff',
		pointHoverBackgroundColor: '#fff',
		pointHoverBorderColor: 'rgba(148,159,177,0.8)'
	}]

	// Chart Data
	public chartData;

	// Chart Status
	public chartReady = false;

	constructor(private summaryService: SummaryService) { }

	ngOnInit(): void {

		this.summaryService.getByStatus().subscribe((data) => {

			const backgroundColor = [
				'#56a0d3',
				'#0a8ea0',
				'#3369e7',
				'#146eb4',
				'#49c0b6',
				'#ff9933',
				'#ee6123',
				'#075aaa',
			];
			let dataArray = [];
			data.map((element, index) => {

				element.status =
					element.status.charAt(0).toUpperCase() + element.status.slice(1);

				dataArray.push({
					label: element.status,
					data: [element.count],
					backgroundColor: backgroundColor[index || 0],
					hoverBackgroundColor: backgroundColor[index || 0],
				});
			});

			this.chartData = dataArray;
			this.chartReady = true;

		})
	}

}
