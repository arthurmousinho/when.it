import type { Metadata } from "next";
import "./globals.css";

import faviconImage from "@/assets/brand/icon-logo.svg"
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "when.it",
  description: "A platform designed to connect employees with their company's knowledge base through an AI-powered chatbot",
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
      <body className="bg-slate-50">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
