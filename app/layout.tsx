import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethereum Events 2025",
  description: "A list of Ethereum events in 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-4`}
      >
        <div className="flex flex-col min-h-screen bg-grid">
          <header className="flex items-center justify-between mt-6 container mx-auto bg-bg">
            <div className="flex items-center justify-between px-4 py-4 w-full border h-24">
              <h1 className="text-lg font-bold uppercase">Ξevents</h1>
              {/* <nav className="text-right font-mono text-sm ">
                <div>conferences</div>
                <div>meetups</div>
                <div>starred</div>
              </nav> */}
            </div>
          </header>
          <main className="container mx-auto mb-12">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
