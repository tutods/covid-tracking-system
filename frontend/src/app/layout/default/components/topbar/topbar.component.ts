import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../../auth/session.service';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {
	user: any

	@Output()
	toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

	constructor(private session: SessionService, private router: Router) { }

	ngOnInit(): void {
		const me = this.session.me()

		if (me) {
			this.user = me.user
		}
	}

	toggleSideBar() {
		this.toggleSideBarForMe.emit();
		setTimeout(() => {
			window.dispatchEvent(
				new Event('resize')
			);
		}, 300);
	}

	logout() {
		this.session.logout()
		this.router.navigateByUrl('/login')
	}
}
