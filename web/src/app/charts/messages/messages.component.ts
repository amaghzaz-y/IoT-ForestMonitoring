import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    HighchartsChartModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart';
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Total Messages',
    },
    series: [
      {
        data: [
          [0, 1432],
          [1, 1432],
          [2, 6784],
          [3, 3445],
          [4, 843],
          [5, 123],
          [6, 3543],
          [7, 8987],
          [8, 2322],
          [9, 4435],
          [10, 5437],
          [11, 2139],
          [12, 5412],
          [13, 7967],
          [14, 4359],
        ],
        type: 'line',
      },
    ],
  };

  updateFlag: any = false;
  constructor() {}
}
