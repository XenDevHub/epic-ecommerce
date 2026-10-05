import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "E-Pic Marketplace — Bangladesh's Premium Shopping Destination",
  description:
    "Discover products, explore personalized shops, and enjoy AI-powered shopping assistance. Free for customers and sellers.",
  keywords: [
    "E-Pic",
    "marketplace",
    "Bangladesh",
    "shopping",
    "e-commerce",
    "online shop",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased bg-bg-primary text-text-primary">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
