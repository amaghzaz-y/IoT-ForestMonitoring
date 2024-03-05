import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
const prisma = new PrismaClient();

export async function addDataToDatabase(): Promise<void> {
  try {
    const today = new Date();
    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - d);
      for (let i = 0; i < 96; i++) {
        let deveui = nanoid() as string;
        let eui = nanoid() as string;
        let date = currentDate;
        await prisma.endDevice.create({
          data: {
            DevEUI: deveui,
            Eui: eui,
            LastSeen: date,
          },
        });
        await prisma.metric.create({
          data: {
            temperature: Math.floor(Math.random() * 46),
            humidity: Math.floor(Math.random() * 100),
            sound: Math.floor(Math.random() * 120),
            movement: Boolean(Math.floor(Math.random() * 2)),
            flame: Boolean(Math.floor(Math.random() * 2)),
            lux: Math.floor(Math.random() * 1000),
            date: date,
            endDevice: {
              connect: {
                Eui: eui,
              },
            },
          },
        });
      }
    }

    console.log("Data added successfully!");
  } catch (error) {
    console.error("Error adding data to database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function MockRealtime(): Promise<void> {
  try {
    const today = new Date();
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate());
    let deveui = nanoid() as string;
    let eui = nanoid() as string;
    let date = currentDate;
    await prisma.endDevice.create({
      data: {
        DevEUI: deveui,
        Eui: eui,
        LastSeen: date,
      },
    });
    await prisma.metric.create({
      data: {
        temperature: Math.floor(Math.random() * 46),
        humidity: Math.floor(Math.random() * 100),
        sound: Math.floor(Math.random() * 120),
        movement: Boolean(Math.floor(Math.random() * 2)),
        flame: Boolean(Math.floor(Math.random() * 2)),
        lux: Math.floor(Math.random() * 1000),
        date: date,
        endDevice: {
          connect: {
            Eui: eui,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error adding data to database:", error);
  } finally {
    await prisma.$disconnect();
  }
}
