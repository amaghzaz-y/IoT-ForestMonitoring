import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DevicesComponent } from './charts/devices/devices.component';
import { MessagesComponent } from './charts/messages/messages.component';
import { TemperatureComponent } from './charts/temperature/temperature.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    DevicesComponent,
    MessagesComponent,
    TemperatureComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'web';
}
