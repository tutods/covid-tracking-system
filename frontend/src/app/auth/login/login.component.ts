import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TitleService } from './../../services/title/title.service';
import { UiService } from './../../services/ui/ui.service';
import { SessionService } from './../session.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

	emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

	loginForm: FormGroup;

	constructor(
		public session: SessionService,
		public router: Router,
		private uiService: UiService,
		private fBuild: FormBuilder,
		private titleService: TitleService
	) {
		this.titleService.setPageTitle("Sing In")
	}

	ngOnInit() {
		const me = this.session.me()

		if (me) {
			this.router.navigateByUrl('/admin')
		}

		this.loginForm = new FormGroup({
			'email': new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.pattern(this.emailPattern)
			]),
			'password': new FormControl('', [Validators.required])
		});
	}

	// To disable button if have errors
	get loginFormControl() {
		return this.loginForm.controls;
	}

	// When submit form
	onSubmit(evt) {
		// Prevent Default
		evt.preventDefault();

		const user = {
			email: this.loginForm.get('email').value,
			password: this.loginForm.get('password').value
		};

		// Send POST Request to API
		this.session
			.login(user.email, user.password)
			.subscribe(
				(user) => {
					this.router.navigateByUrl('/admin')
					this.uiService.showSnackBar('Login with success!')
				},
				(error) => {
					this.uiService.showSnackBar(((typeof error.error.message != "object") ? error.error.message : "Sorry but have error on login. Try again later please.") || "Sorry but have error on login. Try again later please.")
				}
			)
	}
}
