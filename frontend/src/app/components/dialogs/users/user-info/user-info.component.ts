import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from './../../../../models/user.model';
import { RolesService } from './../../../../services/roles-service/roles.service';
import { UsersService } from './../../../../services/users-service/users.service';

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.sass']
})
export class UserInfoComponent implements OnInit {
	scopes: any[] = []
	user: User

	constructor(
		public usersService: UsersService,
		public rolesService: RolesService,
		public dialogRef: MatDialogRef<UserInfoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: User
	) {
		this.user = data
		this.scopes = data.role.scopes.map((scope) => {
			let cleanScope = scope.split('--').join('').split('-').join(' ')
			return cleanScope
		})

		console.log(this.scopes)
	}

	ngOnInit(): void {
	}

	onClose() {
		this.dialogRef.close()
	}

}
