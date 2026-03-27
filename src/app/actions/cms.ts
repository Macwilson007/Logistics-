"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSiteContent(key: string, value: string) {
  try {
    const content = await prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    
    revalidatePath("/admin/content");
    revalidatePath("/"); // Revalidate home for hero updates
    // Use dynamic revalidation for [slug] pages if needed
    
    return { success: true, content };
  } catch (error) {
    console.error("Failed to update site content:", error);
    return { success: false, error: "Failed to update content." };
  }
}

export async function batchUpdateSiteContent(updates: { key: string; value: string }[]) {
  try {
    for (const { key, value } of updates) {
      await prisma.siteContent.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    
    revalidatePath("/admin/content");
    revalidatePath("/", "layout"); // Revalidate app-wide
    
    return { success: true };
  } catch (error) {
    console.error("Batch update failed:", error);
    return { success: false, error: "Batch update failed." };
  }
}
