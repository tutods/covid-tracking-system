import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataByEmailComponent } from '../../../../components/dialogs/data-by-email/data-by-email.component';
import { UiService } from '../../../../services/ui/ui.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
	public dialogSize: string = (window.innerWidth >= 1200) ? '25vw' : (window.innerWidth >= 800) ? '50vw' : '85vw'

	constructor(
		public dialog: MatDialog,
		private uiService: UiService
	) { }

	ngOnInit(): void { }

	openPatientDataForm() {
		let dialogRef = this.dialog.open(DataByEmailComponent, {
			width: this.dialogSize,
		});

		dialogRef.afterClosed().subscribe((response) => {
			if (response) {
				this.uiService.showSnackBar(response.message);
			}
		});
	}
}
