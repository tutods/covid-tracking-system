import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../../../services/covid-api/covid-api.service';

@Component({
	selector: 'app-world-chart',
	templateUrl: './world-chart.component.html',
	styleUrls: ['./world-chart.component.sass']
})
export class WorldChartComponent implements OnInit {

	// Chart Status
	public chartReady = false;

	// Chart Labels
	public pieChartLabels = ['Total Recovered', 'Total Death', 'Total Confirmed'];

	// Chart Type
	public pieChartType = 'pie';

	// Chart colors
	public pieChartColors = [
		{
			backgroundColor: ['#0099cc', '#ff9933', '#146eb4'],
		},
	];

	// Chart Data
	public pieChartData;

	// Chart options
	public pieChartOptions = {
		legend: {
			labels: {
				fontColor: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "white" : "black"
			}
		}
	}

	// Last Update
	public updatedAt;

	constructor(private covidApiService: CovidApiService) { }

	ngOnInit(): void {
		this.covidApiService.getSummary().subscribe((summary) => {
			console.log(summary)
			this.pieChartData = [
				summary.Global.TotalRecovered,
				summary.Global.TotalDeaths,
				summary.Global.TotalConfirmed,
			];
			this.updatedAt = new Date(summary.Date).toLocaleString();
			this.chartReady = true;
		});
	}
}


