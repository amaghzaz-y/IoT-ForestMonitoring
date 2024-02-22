import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    HighchartsChartModule,
  ],
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.css',
})
export class TemperatureComponent {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'arearange',
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1,
      },
    },
    title: {
      text: 'Temperature variation by day',
    },
    xAxis: {
      type: 'datetime',
      accessibility: {
        rangeDescription: 'Range: Jan 1st 2017 to Dec 31 2017.',
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: '°C',
      xDateFormat: '%A, %b %e',
    },
    legend: {
      enabled: false,
    },
    // series: [
    //   {
    //     data: [],
    //   },
    // ],
  };

  updateFlag: any = false;
  constructor() {}
}
