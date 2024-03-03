import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../services/data.service';
import { MetricsSummary } from '../../models';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    NgxChartsModule,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  chartConstructor: string = 'chart';
  metrics: MetricsSummary | undefined;
  view: [number, number] = [500, 400];
  legend: boolean = true;
  legendPosition: any = 'center';

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  temperature = [
    {
      name: 'Temperature',
      value: 0,
    },
  ];

  Humidity = [
    {
      name: 'Temperature',
      value: 0,
    },
  ];

  Lux = [
    {
      name: 'Temperature',
      value: 0,
    },
  ];

  constructor(public api: DataService) {
    api.getDaySummary(new Date().toISOString()).subscribe((data) => {
      this.metrics = data;
    });
  }
}
