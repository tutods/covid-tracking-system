import { Component } from '@angular/core';
import { TitleService } from '../../services/title/title.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {


	constructor(
		private titleService: TitleService
	) {
		this.titleService.setPageTitle("Dashboard")

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
			window.location.reload()
		});
	}
}
