import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { SummaryService } from '../../../services/summary/summary.service';




@Component({
	selector: 'app-by-day',
	templateUrl: './by-day.component.html',
	styleUrls: ['./by-day.component.sass']
})
export class ByDayComponent implements OnInit {

	lineChartData: ChartDataSets[];

	lineChartLabels: number[] = [];

	lineChartOptions = {
		responsive: true,
	};

	lineChartColors: Color[] = [
		{
			borderColor: 'black',
			backgroundColor: 'red',
		},
	];

	lineChartLegend = true;
	lineChartType = 'line';
	lineChart = false;

	constructor(private summaryService: SummaryService) { }

	daysInMonth(month, year) {
		return new Date(year, month, 0).getDate();
	}

	actualMonth = (new Date().getMonth() + 1);
	actualYear = (new Date()).getFullYear();
	numberOfDays = this.daysInMonth(this.actualMonth, this.actualYear);
	numberOfTests: number[] = [this.numberOfDays];

	ngOnInit(): void {
		this.summaryService.getByDay().subscribe(data => {

			for (var i = 0; i < this.numberOfDays; i++) {
				this.numberOfTests[i] = 0;
			}

			data.map((element) => {
				if ((new Date(element.date).getMonth() + 1) == this.actualMonth && (new Date(element.date)).getFullYear() == this.actualYear) {
					this.numberOfTests[(new Date(element.date).getDate()) - 1] += element.numberOfTests
				}
			})

			this.lineChartData = [
				{ data: this.numberOfTests, label: 'Number of tests by day' },
			];

			for (i = 1; i <= this.numberOfDays; i++) {
				this.lineChartLabels.push(i)
			}

			this.lineChart = true;

		})
	}



}
