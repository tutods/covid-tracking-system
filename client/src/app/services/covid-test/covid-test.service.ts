import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { CovidTest } from "../../models/covid-test.model";

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
export class CovidTestService {
	constructor(public http: HttpClient) { }

	create(covidTest: CovidTest) {
		return this.http.post(`${API_URL}/covid-tests/`, covidTest, httpOptions).pipe(share());
	}

	getAll() {
		return this.http.get(`${API_URL}/covid-tests/`, httpOptions).pipe(share());
	}

	getById(id: string) {
		return this.http.get(`${API_URL}/covid-tests/${id}`, httpOptions).pipe(share());
	}

	getOneAndUpdate(id: string, body) {
		return this.http.put(`${API_URL}/covid-tests/${id}`, body).pipe(share());
	}

	getOneAndDelete(id: string) {
		return this.http.delete(`${API_URL}/covid-tests/${id}`, httpOptions).pipe(share());
	}
	getByPatient(patientId: string) {
		return this.http.get(`${API_URL}/covid-tests/patient/${patientId}`, httpOptions).pipe(share());
	}

	getAllWithSort(field: string, order: string) {
		return this.http.get(`${API_URL}/covid-tests/?sort=${field},${order}`, httpOptions);
	}

	getAllWithFilter(field: string, filter: string) {
		return this.http.get(`${API_URL}/covid-tests/?${field}=${filter}`, httpOptions);
	}

	getAllFilteredWithDate(field: string, from: string, to: string) {
		return this.http.get(`${API_URL}/covid-tests/?${field}=${from},${to}`, httpOptions);
	}
}
