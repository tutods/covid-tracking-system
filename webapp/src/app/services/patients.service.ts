import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './../setup';

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

	getAll(): Observable<any> {
		return this.http.get(`${API_URL}/patients/`, httpOptions)
	}

	getById(id: string) {
		return this.http.get(`${API_URL}/patients/${id}`, httpOptions)
	}

}
