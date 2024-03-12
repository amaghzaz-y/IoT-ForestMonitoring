import { ChangeDetectorRef, Component, Input, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { DataService } from "../../services/data.service";
import { Incident, MetricsSummary } from "../../models";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { Observable, interval, last, map } from "rxjs";
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
	lastlength = 0;
	math = Math;
	@Input() public chartData$: Observable<[]> = new Observable();

	constructor(
		public api: DataService,
		private cdr: ChangeDetectorRef,
		public dialog: MatDialog,
	) {
		interval(2000).subscribe(() => {
			api.getAllIncidents().subscribe((data) => {
				this.incidents = data;
				if (this.incidents.length > this.lastlength) {
					this.openDialog();
					this.lastlength = this.incidents.length;
				}
			});
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
