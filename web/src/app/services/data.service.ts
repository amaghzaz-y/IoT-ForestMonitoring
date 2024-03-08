import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, interval, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Incident, MetricsSummary } from "../models";

@Injectable({ providedIn: "root" })
export class DataService {
	url = "http://10.19.5.15:8080";
	private metricsSubject = new BehaviorSubject<MetricsSummary>(
		{} as MetricsSummary,
	);
	metrics: MetricsSummary | null = this.metricsSubject.value;

	constructor(private http: HttpClient) {
		// Start updating metrics every 2 seconds
		interval(2000)
			.pipe(
				switchMap(() =>
					this.http.get<MetricsSummary>(
						`${this.url}/metrics/day/${new Date()}`,
					),
				),
			)
			.subscribe((metrics) => {
				this.updateMetrics(metrics);
			});
	}

	// Method to fetch day summary metrics
	getDaySummary(date: string): Observable<MetricsSummary> {
		return this.http.get<MetricsSummary>(`${this.url}/metrics/day/${date}`);
	}

	// Method to fetch all incidents
	getAllIncidents(): Observable<Incident[]> {
		return this.http.get<Incident[]>(`${this.url}/metrics/emergency`);
	}

	// Method to fetch end device metrics
	getEndDevice(eui: string, date: string): Observable<MetricsSummary> {
		return this.http.get<MetricsSummary>(`${this.url}/metrics/${eui}/${date}`);
	}

	// Method to manually update metrics
	updateMetrics(metrics: MetricsSummary) {
		this.metricsSubject.next(metrics);
		this.metrics = metrics;
	}

	// Method to get metrics as an observable
	getMetrics(): Observable<MetricsSummary> {
		return this.metricsSubject.asObservable();
	}
}
