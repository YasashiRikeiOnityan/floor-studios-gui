import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Floor Studios - Apparel Specification Management System",
  description: "Create, manage, and export apparel specifications with ease. A comprehensive web application for fashion industry professionals to streamline their specification workflow.",
  keywords: "apparel, specification, fashion, clothing, technical specification, garment, production, design, management, web application",
  authors: [{ name: "Floor Studios" }],
  creator: "Floor Studios",
  publisher: "Floor Studios",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://floor-studios.com",
    title: "Floor Studios - Apparel Specification Management System",
    description: "Create, manage, and export apparel specifications with ease. A comprehensive web application for fashion industry professionals to streamline their specification workflow.",
    siteName: "Floor Studios",
  },
  // 実際のTwitterアカウント
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Floor Studios - Apparel Specification Management System",
  //   description: "Create, manage, and export apparel specifications with ease. A comprehensive web application for fashion industry professionals to streamline their specification workflow.",
  //   creator: "@floorstudios",
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Google Search Consoleで取得した実際の値にする
  // verification: {
  //   google: "your-google-site-verification",
  // },
  alternates: {
    canonical: "https://floor-studios.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
