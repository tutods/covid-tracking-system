import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CovidTest } from '../../../../models/covid-test.model';
import { CovidTestService } from '../../../../services/covid-test/covid-test.service';
import { UiService } from '../../../../services/ui/ui.service';

@Component({
	selector: 'app-covid-test-edit',
	templateUrl: './covid-test-edit.component.html',
	styleUrls: ['./covid-test-edit.component.sass']
})
export class CovidTestEditComponent implements OnInit {
	covidTest: CovidTest;
	covidTestForm: FormGroup;
	file: File = null
	// Default Status
	status: string[] = ['pending', 'in Progress', 'finished', 'waiting Result'];
	results: string[] = ['positive', 'negative', 'inconclusive'];


	constructor(
		private formBuilder: FormBuilder,
		public covidTests: CovidTestService,
		public dialogRef: MatDialogRef<CovidTestEditComponent>,
		private uiService: UiService,
		@Inject(MAT_DIALOG_DATA) data
	) {
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
			'result': [this.covidTest.result, []],
			'file': ['', []]
		});
	}

	onFileSelected(e) {
		this.file = <File>(e.target.files || [])[0]
	}

	statusValue() {
		return this.covidTestForm.get('status').value || '';
	}

	isUpdateValid() {
		if (!this.covidTestForm.valid) {
			return false;
		}
		if (this.covidTestForm.get('status').value === 'finished' && (this.covidTestForm.get('result').value === null || this.file === null)) {
			return false;
		}
		return true;
	}

	save(evt) {
		evt.preventDefault()

		if (this.covidTestForm.valid) {
			let formDate: Date = new Date(this.covidTestForm.get('scheduleDate').value)
			formDate = new Date(`${formDate.getFullYear()}-${formDate.getMonth() + 1}-${formDate.getDate()}`)

			let fData = new FormData();
			fData.append('notes', this.covidTestForm.get('notes').value)
			fData.append('date', formDate.toString())
			fData.append('status', this.covidTestForm.get('status').value)

			if (this.covidTestForm.get('result').value)
				fData.append('result', this.covidTestForm.get('result').value)

			if (this.file)
				fData.append('file', this.file, this.file.name)

			this.covidTests.getOneAndUpdate(this.covidTest._id, fData).subscribe(
				(success) => {
					this.dialogRef.close({
						message: "COVID Test updated with success!",
						status: true
					})
				}, (error) => {
					const codeMessage = error.error.message;
					this.dialogRef.close({
						message: codeMessage || "Error on update COVID Test. Try again please.",
						status: false
					})
				}
			);
		} else {
			this.uiService.showSnackBar("Please validate all fields on form and try again.")
		}
	}

	// To disable button if have errors
	get covidTestFormControl() {
		return this.covidTestForm.controls;
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
