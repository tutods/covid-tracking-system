import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from '../../../../models/patient.model';

@Component({
    selector: 'app-information-dialog',
    templateUrl: './information-dialog.component.html',
    styleUrls: ['./information-dialog.component.sass']
})
export class InformationDialogComponent implements OnInit {
    patient: Patient;
    bDate: string;
    symptoms: [];

    allObservationsArr: object[] = [
        { value: 'saude24', label: "Saúde 24" },
        { value: 'riskGroup', label: "Risk Group" },
        { value: 'riskZone', label: "Risk Zone" }
    ];

    observations: any[];

    checkObservations(elements) {
        let observationsArr = new Array()

        if (elements.saude24) {
            observationsArr.push("Saúde 24");
        }
        if (elements.riskGroup) {
            observationsArr.push("Risk Group");
        }
        if (elements.riskZone) {
            observationsArr.push("Risk Zone");
        }

        return observationsArr;
    }

    constructor(public dialogRef: MatDialogRef<InformationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.patient = data;
        this.bDate = new Date(this.patient.birthdayDate).toLocaleDateString();
        this.symptoms = data.symptoms;
        this.observations = this.checkObservations(data.observations)
    }
    ngOnInit(): void {
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
