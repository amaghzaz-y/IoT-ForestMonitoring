import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-devices',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, MatDividerModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css',
})
export class DevicesComponent {}
