import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../../../services/covid-api/covid-api.service';

@Component({
	selector: 'app-pt-chart',
	templateUrl: './pt-chart.component.html',
	styleUrls: ['./pt-chart.component.sass'],
})
export class PtChartComponent implements OnInit {
	// Status of chart
	public chartReady = false;

	// Labels
	public pieChartLabels = ['Total Recovered', 'Total Death', 'Total Confirmed'];

	// Chart Type
	public pieChartType = 'pie';

	// Data to chart
	public pieChartData;

	// Options
	public pieChartOptions = {
		legend: {
			labels: {
				fontColor: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "white" : "black"
			}
		}
	}

	// Last update
	public updatedAt;

	// Set colors
	public pieChartColors = [
		{
			backgroundColor: ['#0099cc', '#ff9933', '#146eb4'],
		},
	];

	constructor(private covidApiService: CovidApiService) { }

	ngOnInit(): void {
		this.covidApiService.getSummary().subscribe((data) => {
			const portugalSummary = this.covidApiService.getPortugalSummary(data);
			this.pieChartData = [
				portugalSummary.TotalRecovered,
				portugalSummary.TotalDeaths,
				portugalSummary.TotalConfirmed
			];
			this.updatedAt = new Date(portugalSummary.Date).toLocaleString();
			this.chartReady = true;
		});
	}
}
