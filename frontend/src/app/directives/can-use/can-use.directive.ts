import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { validateScopes } from 'src/app/functions/validateScopes';
import { SessionService } from './../../auth/session.service';

@Directive({
	selector: '[canUse]'
})
export class CanUseDirective implements OnInit {

	scopes: string[]

	session

	constructor(
		private sessionService: SessionService,
		private viewContainerRef: ViewContainerRef,
		private templateRef: TemplateRef<any>
	) {
		this.session = this.sessionService.me()
	}

	@Input() set canUse(scopes) {
		this.scopes = scopes
	}

	ngOnInit() {
		if (!validateScopes(this.session.user.scopes, this.scopes))
			this.viewContainerRef.clear()
		else
			this.viewContainerRef.createEmbeddedView(this.templateRef)

	}
}
