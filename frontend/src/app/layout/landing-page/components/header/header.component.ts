import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataByEmailComponent } from '../../../../data-by-email/data-by-email.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

	constructor(
		public dialog: MatDialog,
		private snackBar: MatSnackBar
	) { }

	ngOnInit(): void {
	}

	openPatientDataForm() {
		let dialogRef = this.dialog.open(DataByEmailComponent, {
			width: "25vw"
		})

	}

}
