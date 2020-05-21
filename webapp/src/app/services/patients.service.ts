import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
import { Patient } from "./../models/patient.model";

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

    create(patient: Patient) {
		return this.http.post(`${API_URL}/patients/`, patient, httpOptions)
    }
    
	getAll() {
		return this.http.get(`${API_URL}/patients/`, httpOptions)
	}

	getById(id: string) {
		return this.http.get(`${API_URL}/patients/${id}`, httpOptions)
    }
    
    getOneAndUpdate(id: string, patient: Patient){
        return this.http.put(`${API_URL}/patients/${id}`, patient, httpOptions)
    }

    getOneAndDelete(id: string){
        return this.http.delete(`${API_URL}/patients/${id}`, httpOptions)
    }
}
