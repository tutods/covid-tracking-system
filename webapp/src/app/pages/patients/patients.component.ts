import { EditDialogComponent } from './../../edit-dialog/edit-dialog.component';
import { InformationDialogComponent } from './../../information-dialog/information-dialog.component';
import { DialogToDeleteComponent } from './../../dialog-to-delete/dialog-to-delete.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Patient } from './../../models/patient.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../../services/patients.service';

@Component({
    selector: 'app-patients',
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.sass']
})
export class PatientsComponent implements OnInit {

    result: any

	constructor(public patients: PatientsService, private http: HttpClient, public dialog: MatDialog) { }

	ngOnInit(): void {
		const patientsList = this.patients.getAll()

		patientsList.subscribe((list) => {
			this.result = list
        })
    }
    
    openDeleteDialog(patient : Patient) {
        let dialogRef = this.dialog.open(DialogToDeleteComponent);

        dialogRef.afterClosed().subscribe(res => {
            if(res === "true"){
                this.patients.getOneAndDelete(patient._id).subscribe((data)=>window.location.reload()); 
            }
        })
    }
    openInformationDialog(patient : Patient){
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.data = patient;

        this.dialog.open(InformationDialogComponent, dialogConfig);
    }

    openEditDialog(patient : Patient){
        const dialogConfig = new MatDialogConfig();
        
        dialogConfig.data = patient;

        let dialogRef = this.dialog.open(EditDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(res => {
            if(res){
            this.result = res
            this.patients.getOneAndUpdate(patient._id, this.result).subscribe((data)=>window.location.reload());
            }
        }) 
    }
}

