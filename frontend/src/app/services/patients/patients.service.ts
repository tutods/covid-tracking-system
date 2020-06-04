import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Patient } from "../../models/patient.model";
import { observable, Observable } from 'rxjs';

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

    getAll(): Observable<any> {
        return this.http.get(`${API_URL}/patients/`, httpOptions).pipe(share())
    }

    getById(id: string) {
        return this.http.get(`${API_URL}/patients/${id}`, httpOptions)
    }

    getOneAndUpdate(id: string, patient: Patient) {
        return this.http.put(`${API_URL}/patients/${id}`, patient, httpOptions)
    }

    getOneAndDelete(id: string) {
        return this.http.delete(`${API_URL}/patients/${id}`, httpOptions).pipe(share())
    }
}
