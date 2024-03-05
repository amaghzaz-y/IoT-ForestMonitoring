import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import mqtt from "mqtt";
import { Payload } from "./payload";
import { HandleDaySummary, HandleEndDevice, HandleIncidents } from "./api";
import { cors } from "hono/cors";
import { MockRealtime } from "./add_data";
import { logger } from "hono/logger";
const app = new Hono();

let client = mqtt.connect("mqtt://eu1.cloud.thethings.network:1883", {
  username: process.env.TTN_USER,
  password: process.env.TTN_MQTT,
  protocolVersion: 3,
});
client.on("connect", () => {
  client.subscribe("#", (err) => {
    if (err) {
      console.log(err);
    }
  });
});

setInterval(MockRealtime, 2000);

client.on("message", async (topic, message) => {
  let raw = JSON.parse(message.toString());
  let payload = new Payload(raw);
  await payload.SaveToDatabase();
});

app.use(logger());
app.get("/*", cors());
app.get("/metrics/day/:date", HandleDaySummary);
app.get("/metrics/emergency", HandleIncidents);
app.get("/metrics/:eui/:date", HandleEndDevice);

serve({
  fetch: app.fetch,
  port: 8080,
});
