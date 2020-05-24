import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './../../auth/session.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {

	user: any

	constructor(public session: SessionService, public router: Router, private breakpointObserver: BreakpointObserver) { }

	ngOnInit(): void {

		const me = this.session.me()

		if (!me) {
			this.router.navigateByUrl('/login')
		} else {
			this.user = me.user
		}
	}


	logout() {
		this.session.logout()
		this.router.navigateByUrl('/login')
	}
}