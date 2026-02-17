import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { getSessions } from "@/lib/openf1/client";
import { groupIntoRaces } from "@/lib/openf1/helpers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "F1 Live Dashboard",
  description:
    "Immersive, data-rich F1 live dashboard for die-hard fans. Timing, strategy, standings — all in one place.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let races: import("@/types").RaceSummary[] = [];
  try {
    const sessions = await getSessions(2025);
    races = groupIntoRaces(sessions);
  } catch {
    races = [];
  }

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <AppShell races={races}>{children}</AppShell>
      </body>
    </html>
  );
}
