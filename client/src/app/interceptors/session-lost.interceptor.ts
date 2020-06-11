import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SessionService } from '../auth/session.service';

@Injectable()
export class SessionLostInterceptor implements HttpInterceptor {
	constructor(public sessionService: SessionService, public router: Router, private snackBar: MatSnackBar, ) { }
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					// 401 handled in auth.interceptor		
					this.sessionService.clearSession();
					this.snackBar.open("Session Expired, log in again", 'Close', { duration: 3000 });
					this.router.navigateByUrl('/login');
				}
				return throwError(error);
			})
		);
	}
}