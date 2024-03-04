import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MessagesComponent } from './charts/messages/messages.component';
import { TemperatureComponent } from './charts/temperature/temperature.component';
import { SummaryComponent } from './charts/summary/summary.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HumidityComponent } from './charts/humidity/humiditycomponent';
import { SoundComponent } from './charts/sound/sound.component';
import { IncidentsComponent } from './charts/incidents/incidents.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SummaryComponent,
    MessagesComponent,
    TemperatureComponent,
    HumidityComponent,
    NgxChartsModule,
    SoundComponent,
    IncidentsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'web';
}
