import { Component } from "@angular/core";
import { TemperatureComponent } from "../charts/temperature/temperature.component";
import { HumidityComponent } from "../charts/humidity/humiditycomponent";
import { SummaryComponent } from "../charts/summary/summary.component";
import { SoundComponent } from "../charts/sound/sound.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		SummaryComponent,
		TemperatureComponent,
		HumidityComponent,
		SoundComponent,
	],
	templateUrl: "./home.route.html",
	styleUrl: "./home.route.css",
})
export class AppComponent {
	title = "web";
}
