import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateDialogComponent } from '../../components/dialogs/patients/create-dialog/create-dialog.component';
import { DialogToDeleteComponent } from '../../components/dialogs/patients/dialog-to-delete/dialog-to-delete.component';
import { EditDialogComponent } from '../../components/dialogs/patients/edit-dialog/edit-dialog.component';
import { InformationDialogComponent } from '../../components/dialogs/patients/information-dialog/information-dialog.component';
import { PatientsService } from '../../services/patients/patients.service';
import { Patient } from './../../models/patient.model';

@Component({
    selector: 'app-patients',
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.sass']
})
export class PatientsComponent implements OnInit {
    result: any;

    fields: Object[] = [
        { value: 'name', view: 'Name' },
        { value: 'birthdayDate', view: 'Birthday Date' },
        { value: 'status', view: 'Status' },
    ];

    orders: Object[] = [
        { value: 'asc', view: 'Ascendent' },
        { value: 'desc', view: 'Descendent' },
    ];
    selectedField: string;
    selectedOrder: string;

    constructor(
        public patients: PatientsService,
        private http: HttpClient,
        public dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.fetchData();
    }

    openSnackBar(message: string) {
        this.snackBar.open(message, 'Close', { duration: 5000 });
    }

    fetchData() {
        const getAll = this.patients.getAll()

        return getAll.subscribe((data) => {
            this.result = data;
        });
    }

    fetchOrderedData() {
        const getAllWithSort = this.patients.getAllWithSort(this.selectedField, this.selectedOrder);

        return getAllWithSort.subscribe((data) => {
            this.result = data;
        });
    }

    selectedFieldMethod() {
        if (this.selectedOrder) {
            this.fetchOrderedData();
        }
    }

    selectedOrderMethod() {
        if (this.selectedField) {
            this.fetchOrderedData();
        }
    }

    openDeleteDialog(patient: Patient) {
        let dialogRef = this.dialog.open(DialogToDeleteComponent, {
            width: '25vw',
            data: patient
        });

        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.openSnackBar(res.message)

                if (res.status == true)
                    this.fetchData()
            }
        })

    }
    openInformationDialog(patient: Patient) {

        this.dialog.open(InformationDialogComponent, {
            data: patient,
            width: '25vw'
        });
    }

    openEditDialog(patient: Patient) {

        let dialogRef = this.dialog.open(EditDialogComponent, {
            data: patient,
            width: '25vw',
        });

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.openSnackBar(data.message)

                if (data.status == true)
                    this.fetchData()
            }
        })
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(CreateDialogComponent, {
            width: '25vw'
        });

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                this.openSnackBar(data.message)

                if (data.status == true)
                    this.fetchData()
            }
        })
    }
}

