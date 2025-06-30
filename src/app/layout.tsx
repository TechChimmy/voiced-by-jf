import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Sidebar from "./components/Sidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
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
      <body className={`relative ${montserrat.className} select-none bg-black overflow-hidden`}>
        <div className="flex min-h-screen bg-black">
          <Sidebar />
          <main className="flex-1 ml-0 xl:ml-[260px] transition-all duration-300 overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
