import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';

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
	selector: 'app-change',
	templateUrl: './change.component.html',
	styleUrls: ['./change.component.sass'],
})
export class ChangeComponent implements OnInit {
	changeForm: FormGroup;

	private token: string;
	matcher = new MyErrorStateMatcher();

	constructor(
		public session: SessionService,
		public router: Router,
		private snackBar: MatSnackBar,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder
	) {
		this.changeForm = this.formBuilder.group(
			{
				newPassword: ['', [Validators.required]],
				confirmPassword: [''],
			},
			{ validator: this.checkPasswords }
		);
	}

	ngOnInit() {
		this.token = this.activatedRoute.snapshot.paramMap.get('token');
	}

	checkPasswords(group: FormGroup) {
		// here we have the 'passwords' group
		let pass = group.controls.newPassword.value;
		let confirmPass = group.controls.confirmPassword.value;

		return pass === confirmPass ? null : { notSame: true };
	}

	// To disable button if have errors
	get changeFormControl() {
		return this.changeForm.controls;
	}

	openSnackBar(message: string) {
		this.snackBar.open(message, 'Close', { duration: 5000 });
	}

	onSubmit(evt) {
		evt.preventDefault();

		this.session
			.change(
				this.changeForm.get('newPassword').value,
				this.changeForm.get('confirmPassword').value,
				this.token
			)
			.subscribe(
				(data) => {
					this.openSnackBar('Password changed with success');
				},
				(error) => {
					this.openSnackBar(error.error.message.message || 'Token expired');
				}
			);

		this.router.navigateByUrl('/login');
	}
}
