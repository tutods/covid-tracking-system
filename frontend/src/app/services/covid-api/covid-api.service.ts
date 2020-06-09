import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';
import { environment } from "../../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
	providedIn: 'root'
})
export class CovidApiService {


	constructor(public http: HttpClient) { }

	getSummary() {
		const result = this.http.get(`${API_URL}/api-covid/`);
		return result[0].pipe(share())
	}

	getPortugalSummary(data) {
		let Portugal;
		data[0].Countries.forEach(element => {
			if (element.Country == "Portugal") {
				Portugal = element;
			}
		});
		return Portugal;
	}

}
