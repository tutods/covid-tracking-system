import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class SummaryService {

	constructor(public http: HttpClient) { }


	getByStatus() {
		return this.http.get(`${API_URL}/summary/patients/status`, httpOptions).pipe(share());
	}

	getByDay() {
		return this.http.get(`${API_URL}/summary/tests/day`, httpOptions).pipe(share());
	}



}
