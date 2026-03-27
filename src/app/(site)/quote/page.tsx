import QuotePage from "@/components/Quote/QuotePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Logistics Website",
  description: "Get an instant shipping quote. Calculate costs based on weight, dimensions, and destination with our shipping calculator.",
};

export default function Page() {
  return <QuotePage />;
}
