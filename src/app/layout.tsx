import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Logistics Website | Global Shipping & Logistics Solutions",
  description:
    "Delivering excellence across every border. Fast, reliable air, ocean, and road freight with real-time tracking, instant quotes, and 24/7 support.",
  keywords: [
    "logistics",
    "shipping",
    "freight",
    "air cargo",
    "ocean freight",
    "supply chain",
    "tracking",
    "delivery",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
