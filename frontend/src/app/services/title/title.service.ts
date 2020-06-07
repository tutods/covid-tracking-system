import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class TitleService {
	private baseTitle = environment.baseTitle || 'COVID Tracking System';
	private divider = '|';

	constructor(private titleService: Title) { }

	setPageTitle(page?: string) {
		this.titleService.setTitle(`${page ? `${page} ${this.divider}` : ''} ${this.baseTitle}`);
	}
}
