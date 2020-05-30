import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

	constructor(private http: HttpClient, private usersService: UsersService, private sessionService: SessionService, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.fetchData()
	}

	fetchData() {
		const getAll = this.usersService.getAll()

		return getAll.subscribe((data) => {
			this.users = data
		})
	}

	openEditDialog(user: User) {
		let dialogRef = this.dialog.open(UserEditComponent, {
			data: user,
			width: "25vw"
		});

		dialogRef.afterClosed().subscribe(res => {
			console.log(res)
			// if (res === "true") {
			// 	this.patients.getOneAndDelete(patient._id).subscribe(() => window.location.reload());
			// }
		})
	}

}
