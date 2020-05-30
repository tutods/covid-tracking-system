import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { User } from './../../models/user.model';

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
		const request = this.http
			.get(`${API_URL}/users/`, httpOptions)
			.pipe(share());

		return request
	}

	getOneAndUpdate(id: string, user: User): Observable<any> {
		return this.http.put(`${API_URL}/users/${id}`, user, httpOptions).pipe(share())
	}
}
