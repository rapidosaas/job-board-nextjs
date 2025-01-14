import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { AuthProvider } from "@/components/providers";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import PlausibleProvider from "next-plausible";

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
  title: "neoFreelance - Empowering Freelancers and Businesses",
  description: "Discover NeoFreelance, the ultimate platform connecting talented freelancers with businesses worldwide. Find freelance jobs, post projects, and collaborate effortlessly on a secure and innovative marketplace designed for success.",
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
      </body>
    </html>
  );
}
