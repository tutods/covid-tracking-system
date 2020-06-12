import { Component, OnInit } from '@angular/core';
import { TitleService } from './../../services/title/title.service';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

	constructor(
		private titleService: TitleService
	) {
		this.titleService.setPageTitle()

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
			window.location.reload()
		});
	}

	ngOnInit(): void {
	}

	scroll(el: HTMLElement) {
		el.scrollIntoView({ behavior: 'smooth' });
	}
}
