import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";

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
export class PatientsService {
	constructor(public http: HttpClient) { }

	getAll() {
		const result = this.http.get(`${API_URL}/patients/`, httpOptions)

		return result
	}

	getById(id: string) {
		return this.http.get(`${API_URL}/patients/${id}`, httpOptions)
	}

}
