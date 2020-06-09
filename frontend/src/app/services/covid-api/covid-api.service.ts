import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class CovidApiService {


	constructor(public http: HttpClient) { }

	getSummary() {
		const result = this.http.get(`http://localhost:3000/api/api-covid/`);
		return result
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
