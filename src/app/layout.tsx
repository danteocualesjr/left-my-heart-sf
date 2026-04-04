import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Left My Heart in SF",
    template: "%s | Left My Heart in SF",
  },
  description:
    "Stories of love found and lost in the city by the bay. Share your San Francisco love story.",
  openGraph: {
    title: "Left My Heart in SF",
    description:
      "Stories of love found and lost in the city by the bay.",
    siteName: "Left My Heart in SF",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Left My Heart in SF",
    description:
      "Stories of love found and lost in the city by the bay.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
