import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../../../services/users/users.service';
import { User } from './../../../../models/user.model';
import { RolesService } from './../../../../services/roles/roles.service';

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
	}

	ngOnInit(): void {
	}

	onClose() {
		this.dialogRef.close()
	}

}
