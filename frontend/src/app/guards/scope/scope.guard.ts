import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { validateScopes } from 'src/app/functions/validateScopes';
import { SessionService } from '../../auth/session.service';

@Injectable({
	providedIn: 'root'
})
export class ScopeGuard implements CanActivate {

	scopes: string[]
	session: any

	constructor(
		private sessionService: SessionService, private router: Router
	) {
		this.session = this.sessionService.me()
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | boolean {
		if (this.session) {
			if (validateScopes(this.session.user.scopes, route.data.scopes)) {
				return true
			} else {
				this.router.navigate(['/admin'])
				return false;
			}
		} else {
			// Clear session to prevent local storage
			this.sessionService.clearSession()
			// Redirect
			this.router.navigate(['/login'])
			// Return False
			return false
		}
	}

}
