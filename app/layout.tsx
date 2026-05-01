import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarServer from "./components/layout/NavbarServer";
import Footer from "./components/layout/Footer";
import { Toaster } from "./components/ui/sonner";
import { Providers } from "./providers";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Census Office | Information Portal",
  description: "Official portal for Census services and information.",
  icons: {
    icon: [
      { url: "/assets/logos/left.png", type: "image/png" },
      { url: "/assets/logos/left.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/logos/left.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/assets/logos/left.png",
    apple: "/assets/logos/left.png",
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
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <NavbarServer />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
