import { ChangeDetectorRef, Component, Input, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { DataService } from "../../services/data.service";
import { ChartData, Incident, MetricsSummary } from "../../models";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
	selector: "app-lux",
	standalone: true,
	imports: [
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		NgxChartsModule,
	],
	templateUrl: "./luminance.component.html",
	styleUrls: ["./luminance.component.css"],
})
export class LuminanceComponent {
	chartConstructor = "chart";
	incidents: Incident[] | undefined;
	view: [number, number] = [1700, 500];
	legend = true;
	legendPosition = "center";
	math = Math;

	chartData: ChartData[] = [];
	humidity: ChartData = { name: "humidity", series: [] };
	temperature: ChartData = { name: "temperature", series: [] };
	lux: ChartData = { name: "lux", series: [] };
	sound: ChartData = { name: "sound", series: [] };
	movement: ChartData = { name: "movement", series: [] };
	flame: ChartData = { name: "flame", series: [] };

	// options
	showLabels = true;
	animations = true;
	xAxis = true;
	yAxis = true;
	showYAxisLabel = true;
	showXAxisLabel = true;
	xAxisLabel = "Day";
	yAxisLabel = "Value";
	timeline = true;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	colorScheme: any = {
		domain: ["orange", "darkblue"],
	};

	constructor(
		public api: DataService,
		private cdr: ChangeDetectorRef,
	) {
		const today = new Date();
		const daysInWeek = 7;
		for (let i = 0; i < daysInWeek; i++) {
			const currentDate = new Date(today);
			currentDate.setDate(today.getDate() - i); // Increment date by i days
			this.api.getDaySummary(currentDate.toISOString()).subscribe((data) => {
				if (this.chartData) {
					this.processData(data);
					console.log(this.chartData?.length);
				}
			});
		}
	}
	processData(e: MetricsSummary) {
		const date = e.date.split("T")[0];
		this.lux.series.push({ name: date, value: e.lux });
		this.chartData = [this.lux];
	}
}
