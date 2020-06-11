import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { TitleService } from './../../services/title/title.service';
import { UiService } from './../../services/ui/ui.service';

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
		private uiService: UiService,
		private titleService: TitleService,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router
	) {
		this.titleService.setPageTitle("Change Password")

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

	onSubmit(evt) {
		evt.preventDefault();

		if (this.changeForm.valid) {
			this.session
				.change(
					this.changeForm.get('newPassword').value,
					this.changeForm.get('confirmPassword').value,
					this.token
				)
				.subscribe(
					(data) => {
						this.uiService.showSnackBar('Password changed with success');
					},
					(error) => {

						let errorMessage = error.error.message || "Token expired. Please send a new request."

						this.uiService.showSnackBar(errorMessage);
					}
				);

			this.router.navigateByUrl('/login');
		} else {
			this.uiService.showSnackBar("Please validate all fields and try again.")
		}
	}
}
