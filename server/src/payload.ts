import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Payload {
  // end device info
  private EUI: string = "";
  private devEUI: string = "";
  private receivedAt: string = "";
  private content: string = "";
  // sensor data
  private temperature: number = 0.0;
  private humidity: number = 0.0;
  private lux: number = 0.0;
  private flame: boolean = false;
  private movement: boolean = false;
  private sound: number = 0.0;
  private emergency: boolean = false;

  constructor(raw: any) {
    this.EUI = raw["end_device_ids"]["device_id"];
    this.devEUI = raw["end_device_ids"]["dev_eui"];
    this.receivedAt = raw["received_at"];
    this.content = raw["uplink_message"]["decoded_payload"]["raw"].toString();
    this.getValues(raw["uplink_message"]["decoded_payload"]);
    console.log(this.content);
  }

  private getValues(decoded_payload: any) {
    this.humidity = decoded_payload["humidity"];
    this.temperature = decoded_payload["temperature"];
    this.lux = decoded_payload["lux"];
    this.sound = decoded_payload["sound"];
    this.movement = decoded_payload["movement"] == 0 ? false : true;
    this.flame = decoded_payload["flame"] == 0 ? false : true;
    this.emergency = decoded_payload["emergency"] == 0 ? false : true;
    console.log(this.emergency);
  }

  async SaveToDatabase() {
    await this.insertDevice();
    await this.insertMessage();
    await this.insertMetric();
    if (this.emergency) this.insertEMS();
  }

  private async insertDevice() {
    await prisma.endDevice
      .upsert({
        where: {
          Eui: this.EUI,
        },
        update: {
          DevEUI: this.devEUI,
          LastSeen: new Date().toISOString(),
        },
        create: {
          DevEUI: this.devEUI,
          LastSeen: new Date().toISOString(),
          Eui: this.EUI,
        },
      })
      .catch((e) => console.log(e));
  }
  private async insertMessage() {
    await prisma.message
      .create({
        data: {
          eui: this.EUI,
          payload: this.content,
          date: new Date().toISOString(),
        },
      })
      .catch((e) => console.log(e));
  }
  private async insertMetric() {
    await prisma.metric
      .create({
        data: {
          eui: this.EUI,
          date: new Date().toISOString(),
          flame: this.flame,
          humidity: this.humidity,
          lux: this.lux,
          movement: this.movement,
          temperature: this.temperature,
          sound: this.sound,
        },
      })
      .catch((e) => console.log(e));
  }
  private async insertEMS() {
    await prisma.emergencySignal
      .create({
        data: {
          date: new Date().toISOString(),
          eui: this.EUI,
        },
      })
      .catch((e) => console.log(e));
  }
}
