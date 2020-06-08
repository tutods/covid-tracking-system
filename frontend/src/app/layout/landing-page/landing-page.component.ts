import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

	constructor() {
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
