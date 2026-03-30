import { Suspense } from "react";
import TrackPage from "@/components/Track/TrackPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Shipment | Logistics Website",
  description: "Track your shipment in real-time. Enter your tracking number for live status updates, location history, and estimated delivery time.",
};

export default function Page() {
  return (
    <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <TrackPage />
    </Suspense>
  );
}
