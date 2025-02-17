import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/Google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://bentotailwind.com/"),

  title: {
    template: "%s | Bento Grid Maker | Create Beautiful Grid Layouts",
    default: "Bento Grid Maker | Create Beautiful Grid Layouts with Tailwind CSS",
  },

  description: 
    "Create stunning bento grid layouts visually with our interactive grid maker tool. Design, customize and export production-ready grid components for Tailwind CSS, React and Next.js.",

  openGraph: {
    title: "Bento Grid Maker | Create Beautiful Grid Layouts with Tailwind CSS",
    description:
      "Create stunning bento grid layouts visually with our interactive grid maker tool. Design, customize and export production-ready grid components.",
    url: "https://bentotailwind.com/",
    siteName: "Bento Grid Maker",
    locale: "en_US", 
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dknydkolo/image/upload/v1737172798/ScreenShot_Tool_-20250118065946_s8jqwu.png",
        width: 1200,
        height: 630,
        alt: "Bento Grid Maker Preview",
      },
      {
        url: "/images/social-banner.png",
        width: 1080,
        height: 1080,
        alt: "Bento Grid Maker Interface",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  twitter: {
    card: "summary_large_image",
    title: "Bento Grid Maker | Create Beautiful Grid Layouts with Tailwind CSS",
    description:
      "Design stunning bento grid layouts visually with our interactive grid maker tool. Customize and export production-ready components instantly.",
    images: {
      url: "https://res.cloudinary.com/dknydkolo/image/upload/v1737172798/ScreenShot_Tool_-20250118065946_s8jqwu.png",
      alt: "Bento Grid Maker Preview",
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
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
