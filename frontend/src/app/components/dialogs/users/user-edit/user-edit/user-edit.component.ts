import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users-service/users.service';
import { Role } from './../../../../../models/role.model';
import { User } from './../../../../../models/user.model';
import { RolesService } from './../../../../../services/roles-service/roles.service';

@Component({
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {

	roles: any[] = []
	user: User
	userForm: FormGroup
	myRole: Role

	constructor(
		private formBuilder: FormBuilder,
		public usersService: UsersService,
		public rolesService: RolesService,
		public dialogRef: MatDialogRef<UserEditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {

		this.user = data

	}

	ngOnInit(): void {

		const emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

		this.rolesService.getAll().subscribe((roles) => {

			roles.map((role) => {

				this.roles.push(role)
			})
		})

		this.userForm = this.formBuilder.group({
			"name": [this.user.name, [Validators.required]],
			"email": [this.user.email, [Validators.required, Validators.email, Validators.pattern(emailPattern)]],
			"role": [this.user.role["_id"], [Validators.required]]
		})

	}

	// To disable button if have errors
	get userFormControl() {
		return this.userForm.controls;
	}

	// Submit Method
	onSubmit(evt) {
		// Prevent Default
		evt.preventDefault();

		const updatedData = {
			name: this.userForm.get('name').value,
			email: this.userForm.get('email').value,
			role: this.userForm.get('role').value
		}

		this.usersService.getOneAndUpdate(this.user["_id"], updatedData).subscribe((data) => {
			console.log(data)
		}, (error) => {
			
		})

	}

	onClose(): void {
		this.dialogRef.close();
	}

}
