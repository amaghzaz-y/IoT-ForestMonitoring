import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import mqtt from "mqtt";
import { Payload } from "./types";

const prisma = new PrismaClient();

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

client.on("message", (topic, message) => {
  let raw = JSON.parse(message.toString());
  let payload: Payload = {
    deviceId: raw["end_device_ids"]["device_id"],
    devEui: raw["end_device_ids"]["dev_eui"],
    receivedAt: raw["received_at"],
    content: raw["uplink_message"]["decoded_payload"],
  };

  console.log(payload);

  prisma.endDevice
    .upsert({
      where: {
        Eui: payload.deviceId,
      },
      update: {
        DevEUI: payload.devEui,
        LastSeen: new Date().toISOString(),
      },
      create: {
        DevEUI: payload.devEui,
        LastSeen: new Date().toISOString(),
        Eui: payload.deviceId,
      },
    })
    .catch((e) => console.log(e));
});

serve({
  fetch: app.fetch,
  port: 8080,
});
