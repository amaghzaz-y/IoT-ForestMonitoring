import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import mqtt from "mqtt";
import { Payload } from "./payload";
import {
	HandleDaySummary,
	HandleEndDevice,
	HandleIncidents,
	HandleLastData,
} from "./api";
import { cors } from "hono/cors";
import { MockRealtime } from "./add_data";
import { logger } from "hono/logger";

// setInterval(MockRealtime, 2000);

const app = new Hono();
const client = mqtt.connect("mqtt://eu1.cloud.thethings.network:1883", {
	username: process.env.TTN_USER,
	password: process.env.TTN_MQTT,
	protocolVersion: 3,
});

console.log("server started successfully !");

client.on("connect", () => {
	client.subscribe("#", (err) => {
		if (err) {
			console.log(err);
		}
		console.log("connected successfully to MQTT !");
	});
});

client.on("message", async (topic, message) => {
	const raw = JSON.parse(message.toString());
	const payload = new Payload(raw);
	await payload.SaveToDatabase();
});

app.use("*", logger());
app.get("/*", cors());
app.get("/api/metrics/day/:date", HandleDaySummary);
app.get("/api/metrics/emergency", HandleIncidents);
app.get("/api/metrics/last/50", HandleLastData);
app.get("/api/metrics/:eui/:date", HandleEndDevice);

console.log("server started successfully !");

serve({
	fetch: app.fetch,
	port: 8080,
});
