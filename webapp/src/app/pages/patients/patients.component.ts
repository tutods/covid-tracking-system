import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PatientsService } from './../../services/patients.service';

@Component({
	selector: 'app-patients',
	templateUrl: './patients.component.html',
	styleUrls: ['./patients.component.sass']
})
export class PatientsComponent implements OnInit {

	result: any

	constructor(public patients: PatientsService, private http: HttpClient) { }

	ngOnInit(): void {
		const patientsList = this.patients.getAll()

		patientsList.subscribe((list) => {
			this.result = list
		})
	}

}
