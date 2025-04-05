import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

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

export async function generateMetadata(): Promise<Metadata> {
  return {
      openGraph: {
          siteName: "Vemer",
          title: "Potensimu Untuk Bersama",
          description: "Dapatkan informasi event-event menarik dan ikuti berbagai event guna diri sendiri dan orang lain.",
          type: "website",
          locale: "id_ID",
      },
      title: "Potensimu Untuk Bersama",
      description: "Dapatkan informasi event-event menarik dan ikuti berbagai event guna diri sendiri dan orang lain.",
      keywords: "Vemer, register vemer, buat akun vemer",
      robots: "index, follow",
      other: {
          ["og:site_name"]: "Vemer",
          ["og:title"]: "Potensimu Untuk Bersama",
          ["og:description"]: "Dapatkan informasi event-event menarik dan ikuti berbagai event guna diri sendiri dan orang lain.",
          ["og:type"]: "website",
          ["og:locale"]: "id_ID",
      }
  };
}

export async function generateViewport(): Promise<Viewport> {
  return {
    initialScale: 1.0,
    width: 'device-width',
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
