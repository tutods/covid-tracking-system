import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

	session: any = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

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

		this.session = null
		localStorage.removeItem('user')

		const request = this.http.post(`${API_URL}/users/logout`, httpOptions)

		request.subscribe()
	}

}
