import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from "rxjs/operators";
import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	}),
	withCredentials: true,
};

@Injectable({
	providedIn: 'root'
})

export class SessionService {

	expired: boolean
	private session: any = localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: null


	constructor(public http: HttpClient) {
	}

	login(email: String, password: String) {
		const request = this.http
			.post(
				`${API_URL}/users/login`,
				{
					email, password
				},
				httpOptions
			)
			.pipe(share());

		request.subscribe(
			(user) => {
				this.session = user
				localStorage.setItem('user', JSON.stringify(user))
			}
		)

		return request
	}

	me() {
		return this.session
	}

	logout() {
		this.expired = false;
		this.session = null
		localStorage.removeItem('user')

		const request = this.http.post(`${API_URL}/users/logout`, httpOptions).subscribe()

		return request
	}

	reset(email: string) {


		const request = this.http
			.post(`${API_URL}/users/reset-password`, { email }, httpOptions)
			.pipe(share());

		return request
	}

	clearSession() {
		this.expired = true;
		this.session = null
		localStorage.removeItem('user')
	}

	change(newPassword: string, confirmPassword: string, token: string): Observable<any> {

		const request = this.http
			.post(`${API_URL}/users/change-password/${token}`, {
				newPassword, confirmPassword
			}, httpOptions)
			.pipe(share());

		return request
	}

}
