import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    HighchartsChartModule,
  ],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css',
})
export class DevicesComponent {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Total Devices',
    },
    series: [
      {
        data: [
          [0, 3],
          [1, 5],
          [2, 7],
          [3, 3],
          [4, 8],
          [5, 10],
          [6, 3],
          [7, 4],
          [8, 2],
          [9, 2],
          [10, 7],
          [11, 9],
          [12, 12],
          [13, 7],
          [14, 9],
        ],
        type: 'line',
      },
    ],
  };

  updateFlag = false;
  constructor() {}
}
