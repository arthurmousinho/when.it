import type { Metadata } from "next";
import "./globals.css";

import faviconImage from "@/assets/brand/icon-logo.svg"
import { SidebarProvider } from "@/components/ui/sidebar";
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
      <body>
        <SidebarProvider>
          <Toaster />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
