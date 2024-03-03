import { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { getAllIncidents, getDaySummary, getEndDevice } from "./models";

export async function HandleDaySummary(ctx: Context) {
  const dateparam = ctx.req.param().date;
  const date = new Date(dateparam);
  const summary = await getDaySummary(date);
  if (summary) {
    return ctx.json(summary, 200);
  } else {
    return ctx.json({ error: "Error fetching day summary" }, 403);
  }
}

export async function HandleIncidents(ctx: Context) {
  const data = await getAllIncidents();
  if (data) {
    return ctx.json(data, 200);
  } else {
    return ctx.json({ error: "Error fetching incidents" }, 403);
  }
}

export async function HandleEndDevice(ctx: Context) {
  const eui = ctx.req.param().eui;
  const date = new Date(ctx.req.param().date);
  const data = await getEndDevice(eui, date);
  if (data) {
    return ctx.json(data, 200);
  } else {
    return ctx.json({ error: "Error fetching end device" }, 403);
  }
}
