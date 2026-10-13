import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "E-Pic Marketplace — Bangladesh's Next-Gen Smart Commerce",
  description:
    "Experience authentic Bangladeshi luxury and high-performance technology. Guaranteed 2-Hour Dhaka Express handoff, instant decentralized escrow, and intelligent AI-matched bundles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-background text-on-surface font-body-md text-body-md min-h-screen selection:bg-primary-container selection:text-on-primary-container antialiased">
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
