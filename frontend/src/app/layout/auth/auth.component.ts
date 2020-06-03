import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit {
	title: string;

	constructor(private router: Router) {
		// Set Title
		this.title = (this.router.url.includes('login'))
			? "Sign In"
			: (this.router.url.includes('reset-password'))
				? "Reset Password"
				: (this.router.url.includes('change-password'))
					? "Change Password"
					: "Welcome!"
	}

	ngOnInit(): void { }
}
