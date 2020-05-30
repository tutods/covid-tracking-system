import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from './../../auth/session.service';
import { UserEditComponent } from './../../components/dialogs/users/user-edit/user-edit/user-edit.component';
import { User } from './../../models/user.model';
import { UsersService } from './../../services/users-service/users.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

	users
	loginUser = this.sessionService.me().user.email

	constructor(private http: HttpClient, private usersService: UsersService, private sessionService: SessionService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.fetchData()
	}

	fetchData() {
		const getAll = this.usersService.getAll()

		return getAll.subscribe((data) => {
			this.users = data
		})
	}

	openSnackBar(message: string) {
		this.snackBar.open(message, 'Close', { duration: 5000 })
	}

	openEditDialog(user: User) {
		let dialogRef = this.dialog.open(UserEditComponent, {
			data: user,
			width: "25vw"
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				if (result.status == true) {
					this.openSnackBar(result.message)
					this.fetchData()
				} else {
					this.openSnackBar(result.message)
				}
			}
		})
	}

}
