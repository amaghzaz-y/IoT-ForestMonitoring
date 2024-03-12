import { ChangeDetectorRef, Component, Input, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { DataService } from "../../services/data.service";
import { ChartData, Incident, MetricsSummary } from "../../models";
import { NgxChartsModule } from "@swimlane/ngx-charts";

@Component({
	selector: "app-temphumid",
	standalone: true,
	imports: [
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		NgxChartsModule,
	],
	templateUrl: "./temphumid.component.html",
	styleUrls: ["./temphumid.component.css"],
})
export class TempHumidComponent {
	chartConstructor = "chart";
	incidents: Incident[] | undefined;
	view: [number, number] = [1700, 350];
	legend = true;
	legendPosition = "center";
	math = Math;

	chartData: ChartData[] = [];
	humidity: ChartData = { name: "humidity", series: [] };
	temperature: ChartData = { name: "temperature", series: [] };

	// options
	showLabels = false;
	animations = true;
	xAxis = true;
	yAxis = true;
	showYAxisLabel = true;
	showXAxisLabel = true;
	xAxisLabel = "Day";
	yAxisLabel = "C (temp), % (humidity)";
	timeline = false;

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
			currentDate.setDate(today.getDate() - i);
			this.api.getDaySummary(currentDate.toISOString()).subscribe((data) => {
				if (this.chartData) {
					this.processData(data);
				}
			});
		}
	}
	processData(e: MetricsSummary) {
		const date = e.date.split("T")[0];
		this.humidity.series.push({ name: date, value: e.humidity });
		this.temperature.series.push({ name: date, value: e.temperature });
		this.chartData = [this.humidity, this.temperature];
	}
}
