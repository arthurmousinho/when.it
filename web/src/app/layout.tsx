import type { Metadata } from "next";
import "./globals.css";

import faviconImage from "@/assets/brand/icon-logo.svg"

export const metadata: Metadata = {
  title: "when.it",
  description: "An educational platform designed to connect students with their school's knowledge base through an AI-powered chatbot",
  icons: {
    icon: faviconImage.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
