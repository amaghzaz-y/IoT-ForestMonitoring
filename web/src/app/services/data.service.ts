import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incident, MetricsSummary } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}
  getDaySummary(date: string): Observable<MetricsSummary> {
    return this.http.get<MetricsSummary>(`/api/metrics/${date}`);
  }
  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`/api/metrics/emergency`);
  }
  getEndDevice(eui: string, date: string): Observable<MetricsSummary> {
    return this.http.get<MetricsSummary>(`/api/metrics/${eui}/${date}`);
  }
}
