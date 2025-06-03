import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AuthProvider } from "@/components/providers";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import PlausibleProvider from "next-plausible";

import { Toaster } from "@/components/ui/sonner"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "neoFreelance",
  description: "neoFreelance, a platform connecting talented freelancers with business providers. Post jobs, find freelance, and collaborate on projetcs.",
  openGraph: {
    title: "neoFreelance",
    description: "Connecting talents with opportunities.",
    url: "https://neofreelance.com",
    siteName: "neoFreelance",
    images: [
      {
        url: "/jannis-brandt-4mHaSX8zvJI-unsplash.jpg",
        width: 1200,
        height: 630,
        alt: "neoFreelance",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="neofreelance.com" customDomain="https://plausible.codewithadu.de" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
        {children}
        </Suspense>
        <Footer />
        </AuthProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={5000}
          toastOptions={{
            className: "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100",
            style: {
              fontFamily: "var(--font-geist-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
