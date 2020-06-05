import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { SummaryService } from '../../../services/summary/summary.service';

@Component({
	selector: 'app-by-symptoms',
	templateUrl: './by-symptoms.component.html',
	styleUrls: ['./by-symptoms.component.sass'],
})
export class BySymptomsComponent implements OnInit {
	// Chart Options
	public chartOptions: ChartOptions = {
		legend: {
			// display: false,
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
	public chartLabels: Label[] = ['Symptom'];

	// Chart Type
	public chartType: ChartType = 'bar';

	// Chart Colors
	// public chartColors = {
	// 		borderColor: ['#146eb4', '#ff9933', '#146eb4', '#49c0b6'],
	// 		backgroundColor: ['#146eb4', '#ff9933', '#146eb4', '#49c0b6'],
	// 	}

	// Chart Data
	public chartData;

	// Chart Status
	public chartReady = false;

	constructor(private summaryService: SummaryService) { }

	ngOnInit(): void {
		this.summaryService.getBySymptoms().subscribe((data) => {
			const backgroundColor = [
				'#56a0d3',
				'#ff9933',
				'#146eb4',
				'#49c0b6',
				'#3369e7',
				'#0a8ea0',
				'#ee6123',
				'#075aaa',
			];
			let dataArray = [];

			data.map((element, index) => {
				element.symptom =
					element.symptom.charAt(0).toUpperCase() + element.symptom.slice(1);
				dataArray.push({
					label: element.symptom,
					data: [element.count],
					backgroundColor: backgroundColor[index || 0],
					hoverBackgroundColor: backgroundColor[index || 0],
				});
			});

			this.chartData = dataArray;
			this.chartReady = true;
		});
	}
}
