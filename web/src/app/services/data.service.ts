import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Incident, MetricsSummary } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  url = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  getDaySummary(date: string): Observable<MetricsSummary> {
    return this.http.get<MetricsSummary>(`${this.url}/metrics/day/${date}`);
  }
  getAllIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.url}/metrics/emergency`);
  }
  getEndDevice(eui: string, date: string): Observable<MetricsSummary> {
    return this.http.get<MetricsSummary>(`${this.url}/metrics/${eui}/${date}`);
  }
}
