import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/Google";
import { Navbar } from "@/app/_components/Navbar/navbar";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://maker.bentotailwind.com/"),

  title: {
    template: "%s | Bento Grid Builder for Tailwind CSS | Responsive Layout Generator",
    default: "Bento Grid Maker: Visual Tailwind CSS Grid Builder for React & Next.js",
  },

  description: 
    "Build responsive bento grid layouts visually with our drag-and-drop builder. Generate production-ready Tailwind CSS code for React/Next.js apps in seconds. Export as React components or HTML + CSS.",

  openGraph: {
    title: "Bento Grid Maker: Drag & Drop Tailwind CSS Layout Builder",
    description:
      "Create pixel-perfect bento grids without coding. Visual editor for Tailwind CSS grid layouts with instant React/Next.js component export. Perfect for portfolios, dashboards & galleries.",
    url: "https://maker.bentotailwind.com/",
    siteName: "Bento Grid Maker",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dknydkolo/image/upload/v1737172798/ScreenShot_Tool_-20250118065946_s8jqwu.png",
        width: 1200,
        height: 630,
        alt: "Bento Grid Maker Interface - Drag & Drop Tailwind CSS Grid Builder",
      },
      {
        url: "https://maker.bentotailwind.com/images/social-banner.png",
        width: 1080,
        height: 1080,
        alt: "Create Responsive Grid Layouts with Bento Grid Maker - Export React & HTML Code",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      "translate": "notranslate",
    },
  },

  twitter: {
    card: "summary_large_image",
    title: "Build Bento Grids Visually - Tailwind CSS Code Generator",
    description: "Turn grid layout ideas into production-ready Tailwind CSS code in minutes. Export as React components or pure HTML/CSS. #TailwindCSS #WebDev",
    images: {
      url: "https://maker.bentotailwind.com/images/twitter-preview.png",
      alt: "Bento Grid Maker Twitter Preview - Visual Grid Builder for Developers",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <GoogleAnalytics />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
