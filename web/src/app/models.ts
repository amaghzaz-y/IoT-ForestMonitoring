export interface MetricsSummary {
	date: string;
	totalDevices: number;
	totalMessages: number;
	humidity: number;
	temperature: number;
	lux: number;
	sound: number;
	movement: number;
	flame: number;
}

export interface Incident {
	id: number;
	eui: string;
	date: string;
}

export interface EndDeviceSummary {
	eui: string;
	humidity: number;
	temperature: number;
	lux: number;
	sound: number;
	movement: number;
	flame: number;
}

export interface SeriesData {
	name: string | number;
	value: number;
}
export interface ChartData {
	name: string;
	series: SeriesData[];
}
