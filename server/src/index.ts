import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import mqtt from "mqtt";
import { Payload } from "./payload";

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
    console.log("connected to TTN !");
  });
});

client.on("message", async (topic, message) => {
  let raw = JSON.parse(message.toString());
  let payload = new Payload(raw);
  await payload.SaveToDatabase();
});

app.get("/metrics/summary", (c) => c.text("summary"));
app.get("/metrics/emergency", (c) => c.text("emergency"));
app.get("/device/:eui", (c) => c.text("eui: " + c.req.param().eui));
app.get("/device/:eui/metrics", (c) =>
  c.text("eui-metrics: " + c.req.param().eui)
);

serve({
  fetch: app.fetch,
  port: 8080,
});
