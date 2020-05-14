import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
	ngOnInit() {
		this.loginForm = new FormGroup({
			'email': new FormControl('', [Validators.required, Validators.email]),
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

		const loginUser = {
			email: this.loginForm.get('email').value,
			password: this.loginForm.get('password').value
		};

		// Send POST Request to API
		this.http
			.post(
				'http://localhost:3000/api/users/login',
				loginUser
			)
			.subscribe((data) => {
				// Correct Data
				this.openSnackBar('Login with success!')
			}, (error) => {
				if (error.error) {
					this.loginForm.reset();
					// Show error message
					this.openSnackBar(error.error.message);
				}
			})
	}
}
