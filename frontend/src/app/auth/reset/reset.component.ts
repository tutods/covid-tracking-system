import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleService } from './../../services/title/title.service';
import { UiService } from './../../services/ui/ui.service';
import { SessionService } from './../session.service';

@Component({
	selector: 'app-reset',
	templateUrl: './reset.component.html',
	styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {

	emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

	resetForm: FormGroup;

	constructor(
		public session: SessionService,
		private titleService: TitleService,
		private uiService: UiService
	) {
		this.titleService.setPageTitle('Reset Password')
	}

	ngOnInit(): void {
		this.resetForm = new FormGroup({
			'email': new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.pattern(this.emailPattern)
			])
		})
	}

	get resetFormControl() {
		return this.resetForm.controls;
	}

	onSubmit(evt) {
		//Prevent Default
		evt.preventDefault();

		if (this.resetForm.valid) {
			const email = this.resetForm.get('email').value;

			this.session
				.reset(email)
				.subscribe(
					() => {
						this.uiService.showSnackBar(`An email was sent to ${email} with sucess!`)
					},
					(error) => {
						this.uiService.showSnackBar(error.error.message)
					}
				)
		} else {
			this.uiService.showSnackBar("Upps! Have any error, please validate all fields on form.")
		}
	}


}
