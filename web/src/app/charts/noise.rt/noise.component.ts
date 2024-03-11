import { ChangeDetectorRef, Component, Input, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { DataService } from "../../services/data.service";
import {
	ChartData,
	EndDeviceSummary,
	Incident,
	MetricsSummary,
} from "../../models";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { interval } from "rxjs";

@Component({
	selector: "app-noise",
	standalone: true,
	imports: [
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		NgxChartsModule,
	],
	templateUrl: "./noise.component.html",
	styleUrls: ["./noise.component.css"],
})
export class NoiseChartComponent {
	chartConstructor = "chart";
	incidents: Incident[] | undefined;
	view: [number, number] = [1700, 500];
	legend = true;
	legendPosition = "center";
	math = Math;

	chartData: ChartData[] = [];
	sound: ChartData = { name: "humidity", series: [] };
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
		domain: ["orange", "darkblue"],
	};

	constructor(
		public api: DataService,
		private cdr: ChangeDetectorRef,
	) {
		this.api.getLastDevices().subscribe((devices) => {
			this.chartData = [];
			this.sound.series = [];
			for (let i = 0; i < devices.length; i++) {
				this.processData(devices[i], i);
			}
			console.log("updated");
		});
	}
	processData(e: EndDeviceSummary, i: number) {
		this.sound.series.push({ name: i, value: e.sound });
		this.chartData = [this.sound];
	}
}
