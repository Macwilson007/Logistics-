"use server";

import prisma from "@/lib/prisma";

export async function getShipmentStatus(trackingNumber: string) {
  if (!trackingNumber) return null;

  const shipment = await prisma.shipment.findUnique({
    where: { trackingNumber },
    include: {
      updates: {
        orderBy: { timestamp: "desc" },
      },
    },
  });

  return shipment;
}
