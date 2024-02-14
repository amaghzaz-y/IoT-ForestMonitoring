import { Context } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// summary: total metrics per hour, 24 hours
async function getMetricsSummary(c: Context) {
  let totalDevices = await prisma.endDevice.count();
  let totalMessages = await prisma.message.count();
  let totalSOS = await prisma.emergencySignal.count();
}
