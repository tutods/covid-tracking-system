import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CovidTestService } from '../../../../services/covid-test/covid-test.service';

@Component({
	selector: 'app-covid-test-delete',
	templateUrl: './covid-test-delete.component.html',
	styleUrls: ['./covid-test-delete.component.sass']
})
export class CovidTestDeleteComponent implements OnInit {

	public covidTest

	constructor(
		public covidTestService: CovidTestService,
		public dialogRef: MatDialogRef<CovidTestDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) data
	) {
		this.covidTest = data
	}

	ngOnInit(): void {
	}

	onSubmit() {
		let response: object = {}

		this.covidTestService.getOneAndDelete(this.covidTest["_id"]).subscribe(() => {
			response["message"] = "COVID Test deleted with success!"
			response["status"] = true
		}, (error) => {
			let codeMessage = error.error.message

			response["message"] = codeMessage
			response["status"] = false
		})

		this.dialogRef.close(response)
	}

	onClose() {
		this.dialogRef.close()
	}

}
