import { UiService } from './../../../../services/ui/ui.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CovidTest } from '../../../../models/covid-test.model';
import { CovidTestService } from '../../../../services/covid-test/covid-test.service';
import { PatientsService } from '../../../../services/patients/patients.service';


@Component({
	selector: 'covid-test-create',
	templateUrl: './covid-test-create.component.html',
	styleUrls: ['./covid-test-create.component.sass']
})
export class CovidTestCreateComponent implements OnInit {
	public data: CovidTest;
	public covidTestForm: FormGroup;
	public patients: any[] = [];
	public patientsForm = new FormControl();
	public filteredOptions: Observable<any[]>;

	constructor(
		private formBuilder: FormBuilder,
		public covidTest: CovidTestService,
		public patientsService: PatientsService,
		public uiService: UiService,
		public dialogRef: MatDialogRef<CovidTestCreateComponent>
	) { }

	filterValues(value: string): any[] {
		return this.patients.filter(option => option.name.toLowerCase().indexOf(value.toLowerCase()) === 0);
	}

	// To disable button if have errors
	get covidTestFormControl() {
		return this.covidTestForm.controls;
	}

	displayFn(object?: any): string | undefined {
		return object ? `${object.name} (${object.patientNumber})` : undefined;
	}


	onSubmit(evt) {
		evt.preventDefault();

		if (this.covidTestForm.valid) {

			const formDate = new Date(this.covidTestForm.get('scheduleDate').value);

			const formData = {
				patient: this.covidTestForm.get('patient').value.id,
				date: new Date(`${formDate.getFullYear()}-${formDate.getMonth() + 1}-${formDate.getDate()}`),
				notes: this.covidTestForm.get('notes').value,
			};

			this.covidTest.create(formData).subscribe((success) => {
				this.dialogRef.close({
					message: "COVID Test created with success!",
					status: true
				})
			}, (error) => {
				const errorMessage = error.error.message
				this.dialogRef.close({
					message: errorMessage,
					status: false
				});
			});
		} else {
			this.uiService.showSnackBar("Please validate all fields on form and try again.")
		}
	}

	onClose(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {
		this.patientsService.getAll().subscribe((patients) => {
			patients.map((patient) => {
				this.patients.push({ name: patient.name, patientNumber: patient.patientNumber, id: patient._id });
			})
		});

		this.covidTestForm = this.formBuilder.group({
			patient: ['', [
				Validators.required,
			]],
			scheduleDate: ['', [
				Validators.required,
			]],
			notes: ['', []],
		})

		this.filteredOptions = this.covidTestForm.get('patient').valueChanges.pipe(
			startWith<string | any>(''),
			map(val => (typeof val === 'string' ? val : val.name)),
			map(name => (name ? this.filterValues(name) : this.patients.slice()))
		);

	}
}
