import { ChangeDetectorRef, Component, Input, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { DataService } from "../../services/data.service";
import { MetricsSummary } from "../../models";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Observable, interval, map } from "rxjs";

@Component({
	selector: "app-sound",
	standalone: true,
	imports: [
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		NgxChartsModule,
	],
	templateUrl: "./sound.component.html",
	styleUrls: ["./sound.component.css"],
})
export class SoundComponent {
	chartConstructor = "chart";
	view: [number, number] = [500, 400];
	legend = true;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	colorScheme: any = {
		domain: ["#28B67E"],
	};

	constructor(
		public api: DataService,
		private cdr: ChangeDetectorRef,
	) {}
}
