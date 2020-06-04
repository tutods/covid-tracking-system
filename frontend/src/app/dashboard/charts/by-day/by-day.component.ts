import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../../../services/summary/summary.service';



@Component({
	selector: 'app-by-day',
	templateUrl: './by-day.component.html',
	styleUrls: ['./by-day.component.sass']
})
export class ByDayComponent implements OnInit {


	constructor(private summaryService: SummaryService) {

	}

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
				console.log(this.numberOfTests[i])
			}

			Object.values(data).map(element => {
				if ((new Date(element._id).getMonth() + 1) == this.actualMonth && (new Date(element._id)).getFullYear() == this.actualYear) {
					this.numberOfTests[(new Date(element._id).getDate()) - 1] += element.numberOfTests;
				}
			});

			console.log(this.numberOfTests);

		})
	}



}
