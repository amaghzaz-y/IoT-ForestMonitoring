import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { TemperatureComponent } from "./charts/temperature/temperature.component";
import { SummaryComponent } from "./charts/summary/summary.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { HumidityComponent } from "./charts/humidity/humiditycomponent";
import { SoundComponent } from "./charts/sound/sound.component";
import { IncidentsComponent } from "./charts/incidents/incidents.component";
import { TempHumidComponent } from "./charts/temphumid/temphumid.component";
import { LuminanceComponent } from "./charts/luminance/luminance.component";
import { SoundChartComponent } from "./charts/soundchart/soundchart.component";
import { NoiseChartComponent } from "./charts/noise.rt/noise.component";
import { TempHumidRTComponent } from "./charts/temphumid.rt/temphumid.rt.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterOutlet,
		NavbarComponent,
		SummaryComponent,
		TemperatureComponent,
		HumidityComponent,
		NgxChartsModule,
		SoundComponent,
		IncidentsComponent,
		TempHumidComponent,
		SoundChartComponent,
		LuminanceComponent,
		NoiseChartComponent,
		TempHumidRTComponent,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "web";
}
