import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../../../services/users/users.service';
import { User } from './../../../../models/user.model';
import { RolesService } from './../../../../services/roles/roles.service';
import { UiService } from './../../../../services/ui/ui.service';

@Component({
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.sass'],
})
export class UserEditComponent implements OnInit {
	roles: any[] = [];
	user: User;
	userForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		public usersService: UsersService,
		public rolesService: RolesService,
		private uiService: UiService,
		public dialogRef: MatDialogRef<UserEditComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.user = data;
	}

	ngOnInit(): void {
		const emailPattern = '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$';

		this.rolesService.getAll().subscribe((roles) => {
			roles.map((role) => {
				this.roles.push(role);
			});
		});

		this.userForm = this.formBuilder.group({
			name: [this.user.name, [Validators.required]],
			email: [
				this.user.email,
				[
					Validators.required,
					Validators.email,
					Validators.pattern(emailPattern),
				],
			],
			role: [this.user.role['_id'], [Validators.required]],
		});
	}

	// To disable button if have errors
	get userFormControl() {
		return this.userForm.controls;
	}

	// Submit Method
	onSubmit(evt) {
		// Prevent Default
		evt.preventDefault();

		if (this.userForm.valid) {
			const updatedData = {
				name: this.userForm.get('name').value,
				email: this.userForm.get('email').value,
				role: this.userForm.get('role').value,
			};

			let response: object = {};

			this.usersService.getOneAndUpdate(this.user['_id'], updatedData).subscribe(
				(updated) => {
					response['message'] = 'User updated with success!';
					response['status'] = true;
				},
				(error) => {
					let codeMessage = error.error.message;

					if (codeMessage.includes('E11000')) {
						if (codeMessage.includes('email:')) {
							codeMessage = 'Email inserted already exists';
						} else {
							codeMessage = 'Unique error. Please validate all fields!';
						}
					}

					response['message'] = codeMessage;
					response['status'] = false;
				}
			);

			this.dialogRef.close(response);
		} else {
			this.uiService.showSnackBar("Please validate all fields on form and try again.")
		}
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
