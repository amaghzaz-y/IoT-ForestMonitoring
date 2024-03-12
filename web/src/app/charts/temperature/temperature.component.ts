import { ChangeDetectorRef, Component, Input, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { DataService } from "../../services/data.service";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
	selector: "app-temperature",
	standalone: true,
	imports: [
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		NgxChartsModule,
	],
	templateUrl: "./temperature.component.html",
	styleUrls: ["./temperature.component.css"],
})
export class TemperatureComponent {
	chartConstructor = "chart";
	view: [number, number] = [500, 400];
	legend = true;
	legendPosition = "center";
	colorScheme: any = {
		domain: ["#28B67E"],
	};

	constructor(public api: DataService) {}
}
