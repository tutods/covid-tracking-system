import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users-service/users.service';
import { User } from './../../../../../models/user.model';
import { RolesService } from './../../../../../services/roles-service/roles.service';

@Component({
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {

	roles: any
	user: User
	userForm: FormGroup

	constructor(
		private fBuild: FormBuilder,
		public usersService: UsersService,
		public rolesService: RolesService,
		public dialogRef: MatDialogRef<UserEditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
	}

	ngOnInit(): void {
		this.roles = this.rolesService.getAll()
		console.log("ROLES", this.roles)
	}

	// splitStringOnarray(elements) {
	// 	console.log("ORIGINAL", elements)
	// 	if (elements.length == 1) {
	// 		console.log("Só 1!")
	// 		elements[0] = elements[0].split(/(?=[A-Z])/).join(' ')
	// 	} else {
	// 		console.log("Mais do que 1!")
	// 		elements = elements.map((element) => {
	// 			return element.split(/(?=[A-Z])/).join(' ')
	// 		})
	// 	}

	// 	console.log("CHANGED", elements)
	// 	return elements

	// }


}
