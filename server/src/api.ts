import { Context } from "hono";
import {
	getAllIncidents,
	getDaySummary,
	getEndDevice,
	getLastData,
} from "./models";

export async function HandleDaySummary(ctx: Context) {
	const dateparam = ctx.req.param().date;
	const date = new Date(dateparam);
	const summary = await getDaySummary(date);
	if (summary) {
		return ctx.json(summary, 200);
	}
	return ctx.json({ error: "Error fetching day summary" }, 403);
}

export async function HandleIncidents(ctx: Context) {
	const data = await getAllIncidents();
	if (data) {
		return ctx.json(data, 200);
	}
	return ctx.json({ error: "Error fetching incidents" }, 403);
}

export async function HandleEndDevice(ctx: Context) {
	const eui = ctx.req.param().eui;
	const date = new Date(ctx.req.param().date);
	const data = await getEndDevice(eui, date);
	if (data) {
		return ctx.json(data, 200);
	}
	return ctx.json({ error: "Error fetching end device" }, 403);
}

export async function HandleLastData(ctx: Context) {
	const data = await getLastData();
	if (data) {
		return ctx.json(data, 200);
	}
	return ctx.json({ error: "Error fetching day summary" }, 403);
}
