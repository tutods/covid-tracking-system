import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Patient } from '../../../../models/patient.model';
import {
    Component,
    OnInit,
    Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { PatientsService } from '../../../../services/patients/patients.service';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
    styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent implements OnInit {
    startDate = new Date(1990, 0, 1);

    status: string[] = ['Suspect','Infected', 'Non Infected'];

    symptoms: string[] = ['cough',
        'fever',
        'shortness of breathe',
        'lack of smell',
        'lack of taste',
        'tiredness',
        'headaches',
        'diarrhea'];
    observations: string[] = ['saude24',
        'riskGroup',
        'riskZone'];

    currentSymptoms = new FormControl();

    currentObservations = new FormControl();

    realForm: FormGroup;

    patient: Patient;

    date;

    data: any;

    emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

    constructor(private fb: FormBuilder, public patients: PatientsService,
        public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.patient = data
        this.realForm = fb.group({
            bDate: [moment()]
        })
        this.date = new Date(this.patient.birthdayDate);
        this.currentSymptoms.setValue(this.patient.symptoms);

        this.currentObservations.setValue(this.patient.observations);
    }

    ngOnInit(): void {
        this.realForm = new FormGroup({
            'name': new FormControl(this.patient.name, [
                Validators.required
            ]),
            'birthdayDate': new FormControl(this.patient.birthdayDate, [
                Validators.required,
            ]),
            'patientNumber': new FormControl(this.patient.patientNumber, [
                Validators.required,
            ]),
            'status': new FormControl('', [
                Validators.required,
            ]),
            'phone': new FormControl(this.patient.contacts.phone, [
                Validators.required,
            ]),
            'email': new FormControl(this.patient.contacts.email, [
                Validators.required,
                Validators.email,
                Validators.pattern(this.emailPattern)
            ]),
            'symptoms': new FormControl('', [
                Validators.required,
            ]),
            'observations': new FormControl('', [
                Validators.required,
            ]),
        })

    }
    ngOnChanges(){
        this.realForm = new FormGroup({
            'name': new FormControl(this.patient.name, [
                Validators.required
            ]),
            'birthdayDate': new FormControl(this.patient.birthdayDate, [
                Validators.required,
            ]),
            'patientNumber': new FormControl(this.patient.patientNumber, [
                Validators.required,
            ]),
            'status': new FormControl('', [
                Validators.required,
            ]),
            'phone': new FormControl(this.patient.contacts.phone, [
                Validators.required,
            ]),
            'email': new FormControl(this.patient.contacts.email, [
                Validators.required,
                Validators.email,
                Validators.pattern(this.emailPattern)
            ]),
            'symptoms': new FormControl('', [
                Validators.required,
            ]),
            'observations': new FormControl('', [
                Validators.required,
            ]),
        })

    }

    save() {
        this.dialogRef.close({
            name: this.realForm.get('name').value,
            birthdayDate: this.realForm.get('birthdayDate').value,
            patientNumber: this.realForm.get('patientNumber').value,
            status: this.realForm.get('status').value,
            contacts:{
                phone: this.realForm.get('phone').value,
                email: this.realForm.get('email').value,
            },
            symptoms: this.realForm.get('symptoms').value,
            observations: this.realForm.get('observations').value,
        });
    }

    onClose(): void {
        this.dialogRef.close();
    }
}