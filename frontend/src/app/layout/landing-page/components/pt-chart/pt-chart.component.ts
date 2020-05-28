import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../../../../services/covid-api/covid-api.service';

@Component({
  selector: 'app-pt-chart',
  templateUrl: './pt-chart.component.html',
  styleUrls: ['./pt-chart.component.sass'],
})
export class PtChartComponent implements OnInit {
  chartReady = false;
  pieChartLabels = ['TotalRecovered', 'TotalDeath', 'TotalConfirmed'];
  pieChartType = 'pie';
  pieChartColors;
  pieChartData;

  constructor(private covidApiService: CovidApiService) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.pieChartColors = [
        {
          backgroundColor: ['#86a6df', '#ace6f6','#0d8abc'],
        },
      ];
    } else {
      this.pieChartColors = [
        {
          backgroundColor: ['#3b4a6b', '#3e4a61','#001f3f'],
        },
      ];
    }
  }

  data;

  ngOnInit(): void {
    this.covidApiService.getSummary().subscribe((data) => {
      this.data = this.covidApiService.getPortugalSummary(data);
      this.pieChartData = [
        this.data.TotalRecovered,
        this.data.TotalDeaths,
        this.data.TotalConfirmed
      ];
      this.chartReady = true;
    });
  }
}
