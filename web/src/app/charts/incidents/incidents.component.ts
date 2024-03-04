import { ChangeDetectorRef, Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../services/data.service';
import { Incident, MetricsSummary } from '../../models';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'app-incident',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    NgxChartsModule,
  ],
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
})
export class IncidentsComponent {
  chartConstructor: string = 'chart';
  incidents: Incident[] | undefined;
  view: [number, number] = [500, 400];
  legend: boolean = true;
  legendPosition: any = 'center';

  @Input() public chartData$: Observable<any[]> = new Observable();
  colorScheme: any = {
    domain: ['#28B67E'],
  };

  constructor(public api: DataService, private cdr: ChangeDetectorRef) {
    api.getAllIncidents().subscribe((data) => {
      console.log(data);
      this.incidents = data;
    });
  }
}
