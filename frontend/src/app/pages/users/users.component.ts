import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/users/users.service';
import { SessionService } from './../../auth/session.service';
import { UserAddComponent } from './../../components/dialogs/users/user-add/user-add.component';
import { UserDeleteComponent } from './../../components/dialogs/users/user-delete/user-delete.component';
import { UserEditComponent } from './../../components/dialogs/users/user-edit/user-edit.component';
import { UserInfoComponent } from './../../components/dialogs/users/user-info/user-info.component';
import { User } from './../../models/user.model';
import { TitleService } from './../../services/title/title.service';
import { UiService } from './../../services/ui/ui.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
	public dialogSize: string = (window.innerWidth >= 1200) ? '25vw' : (window.innerWidth >= 800) ? '50vw' : '85vw'
	public users;
	public loggedUserEmail: string;

	searchText;

	constructor(
		private usersService: UsersService,
		private sessionService: SessionService,
		public dialog: MatDialog,
		private uiService: UiService,
		private titleService: TitleService
	) {
		this.titleService.setPageTitle('Users')
		this.loggedUserEmail = this.sessionService.me().user.email;
	}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData() {
		const getAll = this.usersService.getAll();

		return getAll.subscribe((data) => {
			this.users = data;
		});
	}

	openEditDialog(user: User) {
		let dialogRef = this.dialog.open(UserEditComponent, {
			data: user,
			width: this.dialogSize,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				if (result.status == true) {
					this.uiService.showSnackBar(result.message);
					this.fetchData();
				} else {
					this.uiService.showSnackBar(result.message);
				}
			}
		});
	}

	openDeleteDialog(user: User) {
		let dialogRef = this.dialog.open(UserDeleteComponent, {
			data: user,
			width: this.dialogSize,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				if (result.status == true) {
					this.uiService.showSnackBar(result.message);
					this.fetchData();
				} else {
					this.uiService.showSnackBar(result.message);
				}
			}
		});
	}

	openInfoDialog(user: User) {
		this.dialog.open(UserInfoComponent, {
			data: user,
			width: this.dialogSize,
		});
	}

	openAddDialog() {
		let dialogRef = this.dialog.open(UserAddComponent, {
			width: this.dialogSize,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				if (result.status == true) {
					this.uiService.showSnackBar(result.message);
					this.fetchData();
				} else {
					this.uiService.showSnackBar(result.message);
				}
			}
		});
	}
}
