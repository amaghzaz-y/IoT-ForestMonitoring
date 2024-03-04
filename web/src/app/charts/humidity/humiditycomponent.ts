import { ChangeDetectorRef, Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../services/data.service';
import { MetricsSummary } from '../../models';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'app-humidity',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    NgxChartsModule,
  ],
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css'],
})
export class HumidityComponent {
  chartConstructor: string = 'chart';
  metrics: MetricsSummary | undefined;
  view: [number, number] = [500, 400];
  legend: boolean = true;
  legendPosition: any = 'center';

  @Input() public chartData$: Observable<any[]> = new Observable();
  colorScheme: any = {
    domain: ['darkblue'],
  };

  constructor(public api: DataService, private cdr: ChangeDetectorRef) {
    api.getDaySummary('2024-02-14').subscribe((data) => {
      console.log(data);
      this.metrics = data;
    });
  }
}
