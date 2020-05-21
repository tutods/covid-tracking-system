import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../setup';
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
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
		localStorage.removeItem('user')
		this.session = null
		this.http.post(`${API_URL}/users/logout`, httpOptions)
	}

	reset(email: string){

		
		const request = this.http
			.post(`${API_URL}/users/resetPassword`,{email},httpOptions)

		request.subscribe(
			(email) =>{
				this.session = email
				//localStorage.setItem('email', JSON.stringify(email))
			}
		)

		return request
	}
}
