import { PatientsService } from './../../../../services/patients/patients.service';
import { Patient } from '../../../../models/patient.model';
import { CovidTestService } from '../../../../services/covid-test/covid-test.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { CovidTest } from '../../../../models/covid-test.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
    selector: 'app-covid-test-create-dialog',
    templateUrl: './covid-test-create-dialog.component.html',
    styleUrls: ['./covid-test-create-dialog.component.sass']
})
export class CovidTestCreateDialogComponent implements OnInit {
    data: CovidTest;
    covidTestForm: FormGroup;
    patients: any[] = [];
    patientsForm = new FormControl();
    filteredOptions: Observable<any[]>;

    constructor(private formBuilder: FormBuilder, public covidTest: CovidTestService, public patientsService: PatientsService, public dialogRef: MatDialogRef<CovidTestCreateDialogComponent>) { }

    filterValues(value: string): any[] {
        console.log(value)
        return this.patients.filter(option => option.name.toLowerCase().indexOf(value.toLowerCase()) === 0);
    }

    displayFn(object?: any): string | undefined {
        return object ? object.name : undefined;
    }
    save() {
        const formDate = new Date(this.covidTestForm.get('scheduleDate').value);

        const formData = {
            patientID: this.covidTestForm.get('patientsForm').value.id,
            scheduleDate: new Date(`${formDate.getFullYear()}-${formDate.getMonth() + 1}-${formDate.getDate()}`),
            notes: this.covidTestForm.get('notes').value,
        };

        //this.covidTest.create(formData).subscribe();
        this.dialogRef.close();
    }


    onClose(): void {
        this.dialogRef.close();
    }
    ngOnInit(): void {
        this.covidTestForm = this.formBuilder.group({
            'patientsForm': ['', [
                Validators.required,
            ]],
            'scheduleDate': ['', [
                Validators.required,
            ]],
            'notes': ['', [
                Validators.required,
            ]],
        })

        this.patientsService.getAll().subscribe((patients) => {
            patients.map((patient) => {
                this.patients.push({ name: patient.name, patientNumber: patient.patientNumber, id: patient._id });
            })
        });
        this.filteredOptions = this.patientsForm.valueChanges.pipe(
            startWith<string | any>(''),
            map(val => (typeof val === 'string' ? val : val.name)),
            map(name => (name ? this.filterValues(name) : this.patients.slice()))
        );

        console.log(this.filteredOptions.subscribe())
    }
}
