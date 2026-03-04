import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Ecoyaan — Eco-Friendly Checkout",
  description:
    "Shop sustainable, eco-friendly products at Ecoyaan. Fast checkout, secure payments, and green delivery.",
  keywords: ["ecoyaan", "eco-friendly", "sustainable", "checkout", "green products"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </body>
    </html>
  );
}
