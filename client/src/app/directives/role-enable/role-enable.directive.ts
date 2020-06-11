import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { validateRoles } from '../../functions/validateRoles';
import { SessionService } from '../../auth/session.service';

@Directive({
	selector: '[roleEnable]'
})
export class RoleEnableDirective implements OnInit {
	roles: string[];
	session;

	constructor(
		private sessionService: SessionService,
		private viewContainerRef: ViewContainerRef,
		private templateRef: TemplateRef<any>
	) {
		this.session = this.sessionService.me();
	}

	@Input() set roleEnable(roles) {
		this.roles = roles;
	}

	ngOnInit() {

		if (!validateRoles(this.session.user.role, this.roles))
			this.viewContainerRef.clear();
		else this.viewContainerRef.createEmbeddedView(this.templateRef);
	}

}
