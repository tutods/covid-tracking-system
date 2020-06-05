import { Patient } from './../../../../models/patient.model';
import { CovidTest } from './../../../../models/covid-test.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CovidTestService } from './../../../../services/covid-test/covid-test.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-covid-test-edit-dialog',
    templateUrl: './covid-test-edit-dialog.component.html',
    styleUrls: ['./covid-test-edit-dialog.component.sass']
})
export class CovidTestEditDialogComponent implements OnInit {
    covidTest: CovidTest;
    covidTestForm: FormGroup;
    // Default Status
    status: string[] = ['pending', 'in Progress', 'finished', 'waiting Result'];
    results: string[] = ['positive', 'negative', 'inconclusive'];


    constructor(private formBuilder: FormBuilder, public covidTests: CovidTestService,
        public dialogRef: MatDialogRef<CovidTestEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.covidTest = data;
    }

    ngOnInit(): void {
        this.covidTestForm = this.formBuilder.group({
            'notes': [this.covidTest.notes, [
                Validators.required
            ]],
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

        this.covidTests.getOneAndUpdate(this.covidTest._id, formData).subscribe();
        this.dialogRef.close()
    }


    onClose(): void {
        this.dialogRef.close();
    }
}
