import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from './../../../../models/user.model';
import { RolesService } from './../../../../services/roles-service/roles.service';
import { UsersService } from './../../../../services/users-service/users.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
		const invalidParent = !!(
			control &&
			control.parent &&
			control.parent.invalid &&
			control.parent.dirty
		);

		return invalidCtrl || invalidParent;
	}
}
@Component({
	selector: 'app-update-password',
	templateUrl: './update-password.component.html',
	styleUrls: ['./update-password.component.sass'],
})
export class UpdatePasswordComponent implements OnInit {
	form: FormGroup;
	user: User;
	matcher = new MyErrorStateMatcher();

	constructor(
		private formBuilder: FormBuilder,
		public usersService: UsersService,
		public rolesService: RolesService,
		public dialogRef: MatDialogRef<UpdatePasswordComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.user = data;
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group(
			{
				oldPwd: ['', [Validators.required]],
				newPassword: ['', [Validators.required, Validators.minLength(6)]],
				confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
			},
			{ validator: this.checkPasswords }
		);
	}

	// To disable button if have errors
	get formControl() {
		return this.form.controls;
	}

	checkPasswords(group: FormGroup) {
		// here we have the 'passwords' group
		let pass = group.controls.newPassword.value;
		let confirmPass = group.controls.confirmPassword.value;

		return pass === confirmPass ? null : { notSame: true };
	}

	// Submit Method
	onSubmit(evt) {
		// Prevent Default
		evt.preventDefault();
		const updatedData = {
			email: this.user.email,
			oldPwd: this.form.get('oldPwd').value,
			newPwd: this.form.get('newPassword').value,
			confirmPwd: this.form.get('confirmPassword').value,
		};

		const updated = this.usersService.updatePassword(updatedData);

		updated.subscribe(
			(success) => {
				const object = {
					status: true,
					message: success.message,
				};

				this.dialogRef.close(object);
			},
			(error) => {
				console.log(error)
				const codeMessage = error.error.message;
				const object = {
					status: false,
					message: codeMessage || "Error on update password! Please try again.",
				};

				this.dialogRef.close(object);
			}
		);
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
