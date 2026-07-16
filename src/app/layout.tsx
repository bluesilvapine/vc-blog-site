import type { Metadata } from "next";
import { JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import VimStatusBar from "@/components/VimStatusBar";
import { siteConfig } from "@/config/site";

// Load typography fonts via Google Fonts
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-mono",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Personal Blog`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.bio,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: `${siteConfig.name} | Personal Blog`,
    description: siteConfig.bio,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Personal Blog`,
    description: siteConfig.bio,
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
      className={`${jetbrainsMono.variable} ${lora.variable} antialiased scroll-smooth`}
    >
      <body className="bg-gruv-bg text-gruv-primary min-h-screen flex flex-col font-serif selection:bg-gruv-purple/20 selection:text-gruv-purple">
        {/* Main layout container */}
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Sidebar (Stationary/Fixed on Desktop) */}
          <Sidebar />

          {/* Main Area (Offset by sidebar width on Desktop) */}
          <main className="flex-1 lg:ml-80 p-6 sm:p-10 lg:p-16 pb-20 lg:pb-24 max-w-5xl">
            {children}
          </main>
        </div>

        {/* Signature Status Bar */}
        <VimStatusBar />
      </body>
    </html>
  );
}
