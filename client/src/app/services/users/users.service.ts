import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { User } from '../../models/user.model';

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
export class UsersService {

	constructor(public http: HttpClient) { }

	getAll() {
		return this.http
			.get(`${API_URL}/users/`, httpOptions)
			.pipe(share());
	}

	getOneAndUpdate(id: string, user: User): Observable<any> {
		return this.http
			.put(`${API_URL}/users/${id}`, user, httpOptions)
			.pipe(share())
	}

	getOneAndDelete(id: string): Observable<any> {
		return this.http
			.delete(`${API_URL}/users/${id}`, httpOptions)
			.pipe(share())
	}

	new(body: object): Observable<any> {
		return this.http
			.post(`${API_URL}/users/`, body, httpOptions)
			.pipe(share())
	}

	updatePassword(body: object): Observable<any> {
		return this.http
			.post(`${API_URL}/users/update-password`, body, httpOptions)
			.pipe(share())
	}
}
