import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Meridian Goods — Premium Essentials",
    template: "%s | Meridian Goods",
  },
  description:
    "Discover curated electronics, fashion, and home goods. Free shipping over $75, easy returns, and a seamless shopping experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-canvas text-ink transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <Suspense
              fallback={
                <div className="sticky top-0 z-50 h-16 border-b border-app glass-panel" />
              }
            >
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
