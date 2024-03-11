import { ChangeDetectorRef, Component, Input, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { DataService } from "../../services/data.service";
import { ChartData, EndDeviceSummary, Incident } from "../../models";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
	selector: "app-temphumid-rt",
	standalone: true,
	imports: [
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		NgxChartsModule,
	],
	templateUrl: "./temphumid.rt.component.html",
	styleUrls: ["./temphumid.rt.component.css"],
})
export class TempHumidRTComponent {
	chartConstructor = "chart";
	incidents: Incident[] | undefined;
	view: [number, number] = [1700, 300];
	legend = true;
	legendPosition = "center";
	math = Math;

	humiditytData: ChartData[] = [];
	temperaturetData: ChartData[] = [];
	humidity: ChartData = { name: "humidity", series: [] };
	temperature: ChartData = { name: "temperature", series: [] };

	// options
	showLabels = true;
	animations = true;
	xAxis = true;
	yAxis = true;
	showYAxisLabel = true;
	showXAxisLabel = false;
	xAxisLabel = "Day";
	yAxisLabel = "Decibels (dB)";
	timeline = true;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	colorScheme: any = {
		domain: ["darkblue"],
	};
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	colorSchemeHumid: any = {
		domain: ["darkgray"],
	};

	constructor(
		public api: DataService,
		private cdr: ChangeDetectorRef,
	) {
		this.api.getLastDevices().subscribe((devices) => {
			this.humiditytData = [];
			this.temperaturetData = [];
			this.humidity.series = [];
			this.temperature.series = [];
			for (let i = 0; i < devices.length; i++) {
				this.processData(devices[i], i);
			}
			console.log("updated");
		});
	}
	processData(e: EndDeviceSummary, i: number) {
		this.humidity.series.push({ name: i, value: e.humidity });
		this.temperature.series.push({ name: i, value: e.temperature });
		this.humiditytData = [this.humidity];
		this.temperaturetData = [this.temperature];
	}
}
