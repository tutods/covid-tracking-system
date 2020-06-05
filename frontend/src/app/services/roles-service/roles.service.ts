import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

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
export class RolesService {

	constructor(public http: HttpClient) { }

	getAll(): Observable<any> {

		const request = this.http
			.get(`${API_URL}/roles/`, httpOptions)
			.pipe(share());

		return request
	}
}
