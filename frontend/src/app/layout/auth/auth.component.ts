import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit {

	constructor(private router: Router) {
	}

	ngOnInit(): void { }
}
