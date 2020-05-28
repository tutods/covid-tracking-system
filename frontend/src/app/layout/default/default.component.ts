import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './../../auth/session.service';

@Component({
	selector: 'app-default',
	templateUrl: './default.component.html',
	styleUrls: ['./default.component.sass']
})
export class DefaultComponent implements OnInit {
	sideBarOpen = true;
	user: any

	constructor(public session: SessionService, public router: Router) { }

	ngOnInit(): void {
		if (window.innerWidth <= 1000) {
			this.sideBarOpen = !this.sideBarOpen
		}

		const me = this.session.me()

		if (!me) {
			this.router.navigateByUrl('/login')
		} else {
			this.user = me.user
		}
	}

	sideBarToggler() {
		this.sideBarOpen = !this.sideBarOpen;
	}
}