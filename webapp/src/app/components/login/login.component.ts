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

	get loginFormControl() {
		return this.loginForm.controls;
	}

	// When submit form
	onSubmit(evt) {
		// Prevent Default
		evt.preventDefault();
		console.log(this.loginForm.get('email').value)

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
			.subscribe((res: any) => {
				console.log(res);
			});

	}
}
