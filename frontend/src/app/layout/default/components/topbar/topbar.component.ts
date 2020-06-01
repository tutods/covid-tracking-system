import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../../auth/session.service';
import { User } from './../../../../models/user.model';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

	@Input()
	user: User

	@Output()
	toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

	constructor(private session: SessionService, private router: Router) { }

	ngOnInit(): void {
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
