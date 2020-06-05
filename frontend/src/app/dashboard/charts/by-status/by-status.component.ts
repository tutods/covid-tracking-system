import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../../../services/summary/summary.service';


@Component({
	selector: 'app-by-status',
	templateUrl: './by-status.component.html',
	styleUrls: ['./by-status.component.sass']
})
export class ByStatusComponent implements OnInit {

	chartReady = false;
	pieChartLabels = [];
	pieChartType = 'doughnut';
	pieChartColors;
	pieChartData = [];
	pieChartOptions = {
		legend: {
			labels: {
				fontColor: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "white" : "black"
			}
		}
	}

	constructor(private summaryService: SummaryService) {
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


		this.summaryService.getByStatus().subscribe((data) => {

			Object.values(data).map(element => {
				this.pieChartLabels.push(element._id)
				this.pieChartData.push(element.count)
			});

			this.chartReady = true;
		})

	}

}
