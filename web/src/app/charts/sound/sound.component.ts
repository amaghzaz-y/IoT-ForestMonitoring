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
  selector: 'app-sound',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    NgxChartsModule,
  ],
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css'],
})
export class SoundComponent {
  chartConstructor: string = 'chart';
  metrics: MetricsSummary | undefined;
  view: [number, number] = [500, 400];
  legend: boolean = true;
  legendPosition: any = 'center';

  @Input() public chartData$: Observable<any[]> = new Observable();
  colorScheme: any = {
    domain: ['#28B67E'],
  };

  constructor(public api: DataService, private cdr: ChangeDetectorRef) {
    api.getDaySummary(new Date().toISOString()).subscribe((data) => {
      this.metrics = data;
    });
  }
}