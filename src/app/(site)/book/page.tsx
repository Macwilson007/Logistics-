import BookPage from "@/components/Book/BookPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Shipment | Logistics Website",
  description: "Book your shipment online. Schedule pickups, choose service levels, and get instant confirmation.",
};

export default function Page() {
  return <BookPage />;
}
