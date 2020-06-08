import { Component } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {

	constructor() {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
			window.location.reload()
		});
	}
}
