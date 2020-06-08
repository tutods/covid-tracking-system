import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CovidTest } from '../../../../models/covid-test.model';
import { CovidTestService } from '../../../../services/covid-test/covid-test.service';

@Component({
	selector: 'app-covid-test-edit',
	templateUrl: './covid-test-edit.component.html',
	styleUrls: ['./covid-test-edit.component.sass']
})
export class CovidTestEditComponent implements OnInit {
	covidTest: CovidTest;
	covidTestForm: FormGroup;
	// Default Status
	status: string[] = ['pending', 'in Progress', 'finished', 'waiting Result'];
	results: string[] = ['positive', 'negative', 'inconclusive'];


	constructor(private formBuilder: FormBuilder, public covidTests: CovidTestService,
		public dialogRef: MatDialogRef<CovidTestEditComponent>,
		@Inject(MAT_DIALOG_DATA) data) {
		this.covidTest = data;
	}

	ngOnInit(): void {
		this.covidTestForm = this.formBuilder.group({
			'notes': [this.covidTest.notes, []],
			'scheduleDate': [new Date(this.covidTest.date), [
				Validators.required,
			]],
			'status': [this.covidTest.status, [
				Validators.required,
			]],
			'result': [this.covidTest.result, [
				Validators.required,
			]]
		});
	}

	save() {
		const formDate = new Date(this.covidTestForm.get('scheduleDate').value)

		const formData = {
			notes: this.covidTestForm.get('notes').value,
			date: new Date(`${formDate.getFullYear()}-${formDate.getMonth() + 1}-${formDate.getDate()}`),
			status: this.covidTestForm.get('status').value,
			result: this.covidTestForm.get('result').value,
		}

		this.covidTests.getOneAndUpdate(this.covidTest._id, formData).subscribe(
			(success) => {
				this.dialogRef.close({
					message: "COVID Test updated with success!",
					status: true
				})
			}, (error) => {
				const codeMessage = error.error.message;
				this.dialogRef.close({
					message: codeMessage,
					status: false
				})
			}
		);
	}

	// To disable button if have errors
	get covidTestFormControl() {
		return this.covidTestForm.controls;
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
