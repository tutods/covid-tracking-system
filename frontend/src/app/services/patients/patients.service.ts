import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Patient } from './../../models/patient.model';

const API_URL = environment.apiUrl;

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
	}),
	withCredentials: true,
};

@Injectable({
	providedIn: 'root',
})
export class PatientsService {
	constructor(public http: HttpClient) { }

	create(patient: Patient): Observable<any> {
		return this.http
			.post(`${API_URL}/patients/`, patient, httpOptions)
			.pipe(share());
	}

	getAll(): Observable<any> {
		return this.http.get(`${API_URL}/patients/`, httpOptions).pipe(share());
	}

	getById(id: string): Observable<any> {
		return this.http
			.get(`${API_URL}/patients/${id}`, httpOptions)
			.pipe(share());
	}

	getOneAndUpdate(id: string, patient: Patient): Observable<any> {
		return this.http
			.put(`${API_URL}/patients/${id}`, patient, httpOptions)
			.pipe(share());
	}

	getOneAndDelete(id: string): Observable<any> {
		return this.http
			.delete(`${API_URL}/patients/${id}`, httpOptions)
			.pipe(share());
	}

	getDataByEmail(
		email: string,
		phoneNumber: number,
		patientNumber: number
	): Observable<any> {
		return this.http
			.post(
				`${API_URL}/patients/get-data`,
				{ email, phoneNumber, patientNumber },
				httpOptions
			)
			.pipe(share());
	}
}
