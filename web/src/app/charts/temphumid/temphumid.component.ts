import { ChangeDetectorRef, Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../services/data.service';
import { ChartData, Incident, MetricsSummary } from '../../models';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-temphumid',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    NgxChartsModule,
  ],
  templateUrl: './temphumid.component.html',
  styleUrls: ['./temphumid.component.css'],
})
export class TempHumidComponent {
  chartConstructor: string = 'chart';
  incidents: Incident[] | undefined;
  view: [number, number] = [1700, 500];
  legend: boolean = true;
  legendPosition: any = 'center';
  math = Math;

  chartData: ChartData[] = [];
  humidity: ChartData = { name: 'humidity', series: [] };
  temperature: ChartData = { name: 'temperature', series: [] };
  lux: ChartData = { name: 'lux', series: [] };
  sound: ChartData = { name: 'sound', series: [] };
  movement: ChartData = { name: 'movement', series: [] };
  flame: ChartData = { name: 'flame', series: [] };

  // options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Day';
  yAxisLabel: string = 'Value';
  timeline: boolean = true;
  colorScheme: any = {
    domain: ['orange', 'darkblue'],
  };

  constructor(public api: DataService, private cdr: ChangeDetectorRef) {
    const today = new Date();
    const daysInWeek = 7;
    for (let i = 0; i < daysInWeek; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
      this.api.getDaySummary(currentDate.toISOString()).subscribe((data) => {
        if (this.chartData) {
          this.processData(data);
        }
      });
    }
    5;
  }
  processData(e: MetricsSummary) {
    let date = e.date.split('T')[0];
    this.humidity.series.push({ name: date, value: e.humidity });
    this.temperature.series.push({ name: date, value: e.temperature });
    this.lux.series.push({ name: date, value: e.lux });
    this.sound.series.push({ name: date, value: e.sound });
    this.movement.series.push({ name: date, value: e.movement });
    this.flame.series.push({ name: date, value: e.flame });
    this.chartData = [this.humidity, this.temperature];
  }
}
