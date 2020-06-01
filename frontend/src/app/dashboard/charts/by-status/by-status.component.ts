import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../../../services/covid-api/covid-api.service';


@Component({
	selector: 'app-by-status',
	templateUrl: './by-status.component.html',
	styleUrls: ['./by-status.component.sass']
})
export class ByStatusComponent implements OnInit {

	chartReady = false;
	pieChartLabels = ['Total Recovered', 'Total Death', 'Total Confirmed'];
	pieChartType = 'pie';
	pieChartColors;
	pieChartData;
	pieChartOptions = {
		legend: {
			labels: {
				fontColor: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "white" : "black"
			}
		}
	}





	constructor(private covidApiService: CovidApiService) {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			this.pieChartColors = [
				{
					backgroundColor: ['#86a6df', '#ace6f6', '#0d8abc'],
				},
			];
		} else {
			this.pieChartColors = [
				{
					backgroundColor: ['#3b4a6b', '#3e4a61', '#001f3f'],
				},
			];
		}
	}

	data;

	ngOnInit(): void {
		this.covidApiService.getSummary().subscribe((data) => {
			this.data = this.covidApiService.getPortugalSummary(data);
			this.pieChartData = [
				20, 30, 10
			];
			this.chartReady = true;
		});
	}

}
