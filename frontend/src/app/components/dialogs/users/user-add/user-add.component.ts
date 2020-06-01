import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from './../../../../models/role.model';
import { RolesService } from './../../../../services/roles-service/roles.service';
import { UsersService } from './../../../../services/users-service/users.service';

@Component({
	selector: 'app-user-add',
	templateUrl: './user-add.component.html',
	styleUrls: ['./user-add.component.sass']
})
export class UserAddComponent implements OnInit {

	roles: Role[] = []
	userForm: FormGroup

	constructor(
		private formBuilder: FormBuilder,
		public usersService: UsersService,
		public rolesService: RolesService,
		public dialogRef: MatDialogRef<UserAddComponent>,
	) { }

	ngOnInit(): void {

		const emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

		this.rolesService.getAll().subscribe((roles) => {

			roles.map((role) => {

				this.roles.push(role)
			})
		})

		this.userForm = this.formBuilder.group({
			"name": ['', [Validators.required]],
			"email": ['', [Validators.required, Validators.email, Validators.pattern(emailPattern)]],
			"role": ['', [Validators.required]]
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

		const body = {
			name: this.userForm.get('name').value,
			email: this.userForm.get('email').value,
			role: this.userForm.get('role').value,
			password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
		}

		let response: object = {}

		this.usersService.new(body).subscribe((user) => {
			response["message"] = "User created with success! Please tell to user request a reset password."
			response["status"] = true
		}, (error) => {
			response["message"] = "Upps! The user not created because an error has occurred."
			response["status"] = false
		})

		this.dialogRef.close(response)
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
