import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { SummaryService } from '../../../services/summary/summary.service';

@Component({
	selector: 'app-by-symptoms',
	templateUrl: './by-symptoms.component.html',
	styleUrls: ['./by-symptoms.component.sass']
})
export class BySymptomsComponent implements OnInit {

	lineChartLabels: Label[];
	lineChartType: ChartType = "bar";
	lineChartColors = [
		{
			borderColor: 'black',
			backgroundColor: '#3b5441',
		},
		{
			borderColor: 'black',
			backgroundColor: '#3d5af1',
		},
		{
			borderColor: 'black',
			backgroundColor: '#1f4287',
		},
	];
	lineChartData;
	chartReady = false;

	constructor(private summaryService: SummaryService) { }

	dataLabels = [];
	dataValues = [];

	ngOnInit(): void {

		this.summaryService.getBySymptoms().subscribe((data) => {

			Object.values(data).map(element => {
				this.dataLabels.push(element._id)
				this.dataValues.push(element.count)
			});

			this.lineChartData = [{ data: this.dataValues, label: 'Number of each reported symptom with Covid' }];
			this.lineChartLabels = this.dataLabels;

			this.chartReady = true;

		})
	}

}
