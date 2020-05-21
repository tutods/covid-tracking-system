import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionService } from './../session.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

	emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}$";

	loginForm: FormGroup;

	constructor(public session: SessionService, public router: Router, private snackBar: MatSnackBar) {
	}

	ngAfterViewInit() {
		if (this.session.session != null) {
			this.router.navigateByUrl('/')
		}
	}

	ngOnInit() {
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

	openSnackBar(message: string) {
		this.snackBar.open(message, 'Close', { duration: 5000 })
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
				() => {
					this.openSnackBar('Login with success!')
					this.router.navigateByUrl('/')
				},
				(error) => {
					this.openSnackBar(error.error.message);
				}
			)
	}

	btnClick= function () {
        this.router.navigateByUrl('//caminho para o resetPassword');
	};
}
