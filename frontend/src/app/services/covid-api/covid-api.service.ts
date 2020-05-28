import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";

const COVID_API = environment.covidAPI;

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {
  

  constructor(public http: HttpClient) {}

  getSummary(){
    const result = this.http.get(`${COVID_API}/summary`);
    return result
  }

  getPortugalSummary(data){
    let Portugal;
    data.Countries.forEach(element => {
      if(element.Country == "Portugal"){
        Portugal = element;
      }
    });
    return Portugal;
  }

}
