import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionService } from '../../../../auth/session.service';
import { UpdatePasswordComponent } from './../../../../components/dialogs/users/update-password/update-password.component';
import { User } from './../../../../models/user.model';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.sass'],
})
export class TopbarComponent implements OnInit {
	@Input()
	user: User;

	@Output()
	toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

	constructor(
		private session: SessionService,
		public dialog: MatDialog,
		private snackBar: MatSnackBar,
		private router: Router
	) { }

	ngOnInit(): void { }

	toggleSideBar() {
		this.toggleSideBarForMe.emit();
		setTimeout(() => {
			window.dispatchEvent(new Event('resize'));
		}, 300);
	}

	logout() {
		this.session.logout();
		this.router.navigateByUrl('/login');
	}

	openSnackBar(message: string) {
		this.snackBar.open(message, 'Close', { duration: 5000 });
	}

	openUpdatePasswordDialog() {
		let dialogRef = this.dialog.open(UpdatePasswordComponent, {
			data: this.user,
			width: '25vw',
		});

		dialogRef.afterClosed().subscribe((response) => {
			if (response) {
				this.openSnackBar(response['message']);

				if (response.status == true) this.logout();
			}
		});
	}
}
