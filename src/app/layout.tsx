import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/component/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const fraunces = localFont({
  src: [
    {
      path: "../../public/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/Fraunces-Italic-VariableFont_SOFT,WONK,opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VOICED by Jeremy Francis",
  description: "Your Voice, Our Priority",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} ${montserrat.variable} ${fraunces.variable} select-none bg-[#0d0b07]`}
      >
        <Navbar />
        {/*
          Navbar is fixed at top-5, pill height ~52px + 20px top offset + 16px bottom gap = ~88px total
          Using pt-[88px] on xl to clear the floating pill navbar
          Mobile: pt-16 to clear the fixed top bar
        */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}