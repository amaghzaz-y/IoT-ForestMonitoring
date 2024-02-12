import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Payload {
  deviceID: string = "";
  devEui: string = "";
  receivedAt: string = "";
  content: string = "";
  constructor(raw: any) {
    this.deviceID = raw["end_device_ids"]["device_id"];
    this.devEui = raw["end_device_ids"]["dev_eui"];
    this.receivedAt = raw["received_at"];
    this.content = raw["uplink_message"]["decoded_payload"];
  }
  private upsertToEndDevice() {
    prisma.endDevice
      .upsert({
        where: {
          Eui: this.deviceID,
        },
        update: {
          DevEUI: this.devEui,
          LastSeen: new Date().toISOString(),
        },
        create: {
          DevEUI: this.devEui,
          LastSeen: new Date().toISOString(),
          Eui: this.deviceID,
        },
      })
      .catch((e) => console.log(e));
  }
}
