import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
import CategoryNavbar from './components/CategoryNavbar';
import Footer from './components/Footer';
import { Store } from "lucide-react";
import { StoreProvider } from "@/context/StoreContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#f7a94a] min-h-screen flex flex-col`}>
        <StoreProvider>

          <header className="sticky top-0 z-50">
            <Navbar />
            <CategoryNavbar />
          </header>
          <main className="flex-grow">{children}</main>
          <Footer />


        </StoreProvider>

      </body>
    </html>
  );
}