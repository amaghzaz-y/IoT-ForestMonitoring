import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MetricsSummary {
  date: string;
  totalDevices: number;
  totalMessages: number;
  humidity: number;
  temperature: number;
  lux: number;
  sound: number;
  movement: number;
  flame: number;
}

interface Incident {
  id: number;
  eui: string;
  date: string;
}

interface EndDeviceSummary {
  eui: string;
  humidity: number;
  temperature: number;
  lux: number;
  sound: number;
  movement: number;
  flame: number;
}

export async function getEndDevice(
  eui: string,
  date: Date
): Promise<EndDeviceSummary | null> {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const metrics = await prisma.metric.findMany({
      where: {
        AND: [
          {
            eui: eui,
          },
          {
            date: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
        ],
      },
    });

    if (metrics.length === 0) {
      console.error("No metrics found for the specified end device and date.");
      return null;
    }

    const totalMetrics = metrics.length;
    let totalHumidity = 0;
    let totalTemperature = 0;
    let totalLux = 0;
    let totalSound = 0;
    let totalMovement = 0;
    let totalFlame = 0;

    metrics.forEach((metric) => {
      totalHumidity += metric.humidity;
      totalTemperature += metric.temperature;
      totalLux += metric.lux;
      totalSound += metric.sound;
      if (metric.movement) totalMovement++;
      if (metric.flame) totalFlame++;
    });

    const humidity = +(totalHumidity / totalMetrics).toFixed(2);
    const temperature = +(totalTemperature / totalMetrics).toFixed(2);
    const lux = +(totalLux / totalMetrics).toFixed(2);
    const sound = +(totalSound / totalMetrics).toFixed(2);
    const movement = +(totalMovement / totalMetrics).toFixed(2);
    const flame = +(totalFlame / totalMetrics).toFixed(2);
    return {
      eui,
      humidity,
      temperature,
      lux,
      sound,
      movement,
      flame,
    };
  } catch (error) {
    console.error("Error fetching end device summary:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllIncidents(): Promise<Incident[] | null> {
  try {
    const emergencySignals = await prisma.emergencySignal.findMany();

    const incidents: Incident[] = emergencySignals.map((signal) => ({
      id: signal.id,
      eui: signal.eui,
      date: signal.date.toISOString(),
    }));

    return incidents;
  } catch (error) {
    console.error("Error fetching emergency incidents:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
export async function getDaySummary(
  date: Date
): Promise<MetricsSummary | null> {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const metrics = await prisma.metric.findMany({
      where: {
        AND: [
          {
            date: {
              gte: startOfDay,
            },
          },
          {
            date: {
              lte: endOfDay,
            },
          },
        ],
      },
    });

    let totalDevices = new Set<string>();
    let totalMessages = 0;
    let totalHumidity = 0;
    let totalTemperature = 0;
    let totalLux = 0;
    let totalSound = 0;
    let totalMovement = 0;
    let totalFlame = 0;

    metrics.forEach((metric) => {
      totalDevices.add(metric.eui);
      totalMessages++;
      totalHumidity += metric.humidity;
      totalTemperature += metric.temperature;
      totalLux += metric.lux;
      totalSound += metric.sound;
      if (metric.movement) totalMovement++;
      if (metric.flame) totalFlame++;
    });

    const averageHumidity = +(totalHumidity / metrics.length).toFixed(2);
    const averageTemperature = +(totalTemperature / metrics.length).toFixed(2);
    const averageLux = +(totalLux / metrics.length).toFixed(2);
    const averageSound = +(totalSound / metrics.length).toFixed(2);

    return {
      date: date.toISOString().split("T")[0],
      totalDevices: totalDevices.size,
      totalMessages: totalMessages,
      humidity: averageHumidity,
      temperature: averageTemperature,
      lux: averageLux,
      sound: averageSound,
      movement: totalMovement,
      flame: totalFlame,
    };
  } catch (error) {
    console.error("Error fetching day summary:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
