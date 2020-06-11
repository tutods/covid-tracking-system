import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from './../../../../models/user.model';
import { UsersService } from '../../../../services/users/users.service';

@Component({
	selector: 'app-user-delete',
	templateUrl: './user-delete.component.html',
	styleUrls: ['./user-delete.component.sass']
})
export class UserDeleteComponent implements OnInit {

	user

	constructor(
		public usersService: UsersService,
		public dialogRef: MatDialogRef<UserDeleteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: User
	) {
		this.user = data
	}

	ngOnInit(): void {
	}

	// Submit Method
	onSubmit() {

		let response: object = {}

		this.usersService.getOneAndDelete(this.user["_id"]).subscribe(() => {
			response["message"] = "User deleted with success!"
			response["status"] = true
		}, (error) => {
			let codeMessage = error.error.message

			response["message"] = codeMessage
			response["status"] = false
		})

		this.dialogRef.close(response)
	}

	// Close dialog
	onClose(): void {
		this.dialogRef.close();
	}

}
