import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../../../../services/covid-api/covid-api.service';






@Component({
  selector: 'app-pt-chart',
  templateUrl: './pt-chart.component.html',
  styleUrls: ['./pt-chart.component.sass']
})
export class PtChartComponent implements OnInit {

  constructor(private covidApiService: CovidApiService) { }

  data;


  ngOnInit(): void {
    this.covidApiService.getSummary().subscribe((data) => {
      this.data = data;
  })

  }

}
