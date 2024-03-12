import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Payload {
	// end device info
	private EUI = "";
	private devEUI = "";
	private receivedAt = "";
	private content = "";
	// sensor data
	private temperature = 0.0;
	private humidity = 0.0;
	private lux = 0.0;
	private flame = false;
	private movement = false;
	private sound = 0.0;
	private emergency = false;
	private canInsert = false;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(raw: any) {
		try {
			this.EUI = raw.end_device_ids.device_id;
			this.devEUI = raw.end_device_ids.dev_eui;
			this.receivedAt = raw.received_at;
			this.content = JSON.stringify(raw.uplink_message);
			this.getValues(raw.uplink_message.decoded_payload);
			console.log("payload: ", raw.uplink_message.decoded_payload);
			this.canInsert = true;
		} catch (e) {
			console.log("error decoded_payload");
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private getValues(decoded_payload: any) {
		this.humidity = decoded_payload.result.h ?? 0;
		this.temperature = decoded_payload.result.t ?? 0;
		this.lux = decoded_payload.result.lux ?? 0;
		this.sound = decoded_payload.result.s ?? 0;
		this.movement = decoded_payload.result.m === 0 ? false : true;
		this.flame = decoded_payload.result.f === 0 ? false : true;
		this.emergency = decoded_payload.result.e === 0 ? false : true;
	}

	async SaveToDatabase() {
		if (!this.canInsert) return;
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
					payload: JSON.stringify(this.content),
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
