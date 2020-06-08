import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

const COVID_API = environment.covidAPI;

@Injectable({
	providedIn: 'root'
})
export class CovidApiService {


	constructor(public http: HttpClient) { }

	getSummary(): Observable<any> {
		const result = this.http.get(`${COVID_API}/summary`).pipe(share());
		return result
	}

	getPortugalSummary(data) {
		let Portugal;

		data.Countries.forEach(element => {
			if (element.Country == "Portugal") {
				Portugal = element;
			}
		});
		return Portugal;
	}

}
