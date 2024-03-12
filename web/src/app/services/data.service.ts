import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, interval, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import {
	ChartData,
	EndDeviceSummary as EndDevice,
	Incident,
	MetricsSummary,
} from "../models";

@Injectable({ providedIn: "root" })
export class DataService {
	url = "http://10.114.11.21:8080/api";
	private metricsSubject = new BehaviorSubject<MetricsSummary>(
		{} as MetricsSummary,
	);
	private deviceSubject = new BehaviorSubject<EndDevice[]>([] as EndDevice[]);
	metrics: MetricsSummary | null = this.metricsSubject.value;
	lastdevices: EndDevice[] | null = this.deviceSubject.value;

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

		interval(2000)
			.pipe(
				switchMap(() =>
					this.http.get<EndDevice[]>(`${this.url}/metrics/last/50`),
				),
			)
			.subscribe((devices) => {
				this.updateLastDevices(devices);
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
	getLastDevices(): Observable<EndDevice[]> {
		return this.deviceSubject.asObservable();
	}
	// Method to manually update metrics
	updateMetrics(metrics: MetricsSummary) {
		this.metricsSubject.next(metrics);
		this.metrics = metrics;
	}
	updateLastDevices(devices: EndDevice[]) {
		this.deviceSubject.next(devices);
		this.lastdevices = devices;
	}
	// Method to get metrics as an observable
	getMetrics(): Observable<MetricsSummary> {
		return this.metricsSubject.asObservable();
	}
}
