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
		public dialogRef: MatDialogRef<CovidTestCreateComponent>
	) { }

	filterValues(value: string): any[] {
		return this.patients.filter(option => option.name.toLowerCase().indexOf(value.toLowerCase()) === 0);
	}

	displayFn(object?: any): string | undefined {
		return object ? object.name : undefined;
	}

	onSubmit(evt) {
		evt.preventDefault();

		const formDate = new Date(this.covidTestForm.get('scheduleDate').value);

		const formData = {
			patient: this.covidTestForm.get('patient').value.id,
			date: new Date(`${formDate.getFullYear()}-${formDate.getMonth() + 1}-${formDate.getDate()}`),
			notes: this.covidTestForm.get('notes').value,
		};

		this.covidTest.create(formData).subscribe();
		this.dialogRef.close();
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
			notes: ['', [
				Validators.required,
			]],
		})

		this.filteredOptions = this.covidTestForm.get('patient').valueChanges.pipe(
			startWith<string | any>(''),
			map(val => (typeof val === 'string' ? val : val.name)),
			map(name => (name ? this.filterValues(name) : this.patients.slice()))
		);

	}
}
