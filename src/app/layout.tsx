import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "春节回家历险记 🐴",
  description: "2026马年新春互动小游戏 — 扮演打工马经历春运回家的重重考验！",
  openGraph: {
    title: "春节回家历险记 🐴",
    description: "扮演打工马经历春运回家的重重考验，通关生成专属新春贺卡！",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-bg-primary antialiased">
        {children}
      </body>
    </html>
  );
}
