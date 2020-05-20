import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
		this.user = this.session.me()
	}

	ngAfterViewInit() {
		if (this.session.session == null) {
			this.router.navigateByUrl('/login')
		}
	}

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);


	logout() {
		this.session.logout()
		this.router.navigateByUrl('/login')
	}
}
