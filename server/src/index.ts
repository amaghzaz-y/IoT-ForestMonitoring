import { serve } from "@hono/node-server";
import { Hono } from "hono";
import mqtt from "mqtt";
let client = mqtt.connect("mqtt://eu1.cloud.thethings.network:1883", {
  username: "",
  password: "",
  protocolVersion: 3,
});

client.on("connect", () => {
  client.subscribe("#", (err) => {
    if (!err) {
      console.log(err);
    }
  });
});

client.on("message", (topic, message) => {
  let payload = JSON.parse(message.toString());
  console.log(payload["uplink_message"]);
});

const app = new Hono();

serve({
  fetch: app.fetch,
  port: 8080,
});
