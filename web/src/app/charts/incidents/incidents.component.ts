import { ChangeDetectorRef, Component, Input, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { DataService } from "../../services/data.service";
import { Incident, MetricsSummary } from "../../models";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Observable, interval, map } from "rxjs";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
@Component({
	selector: "app-incident",
	standalone: true,
	imports: [
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		NgxChartsModule,
		MatButtonModule,
		MatDialogModule,
	],
	templateUrl: "./incidents.component.html",
	styleUrls: ["./incidents.component.css"],
})
export class IncidentsComponent {
	incidents: Incident[] | undefined;
	view: [number, number] = [500, 400];
	math = Math;
	opened = false;
	@Input() public chartData$: Observable<[]> = new Observable();

	constructor(
		public api: DataService,
		private cdr: ChangeDetectorRef,
		public dialog: MatDialog,
	) {
		api.getAllIncidents().subscribe((data) => {
			console.log("incidents", data);
			this.incidents = data;
			if (this.incidents.length > 0) {
				if (!this.opened) {
					this.opened = true;
					this.openDialog();
				}
			}
		});
	}
	openDialog() {
		const dialogRef = this.dialog.open(Dialog);
		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});
	}
}

@Component({
	selector: "dialog-comp",
	standalone: true,
	imports: [
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatDividerModule,
		MatButtonModule,
		MatDialogModule,
	],
	styleUrls: ["./dialog.css"],
	templateUrl: "dialog.html",
})
export class Dialog {}
