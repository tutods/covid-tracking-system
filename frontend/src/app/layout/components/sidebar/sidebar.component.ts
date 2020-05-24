import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './../../../auth/session.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

	constructor(public session: SessionService, public router: Router) { }

	ngOnInit(): void {

	}

	
}
