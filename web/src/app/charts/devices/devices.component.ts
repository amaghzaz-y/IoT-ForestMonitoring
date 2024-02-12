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
      text: 'Total Devices Graph',
    },
    chart: {
      backgroundColor: 'gray',
    },
  };
  updateFlag: boolean = false;
  constructor() {}
}
