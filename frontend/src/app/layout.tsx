"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { poppins } from "./fonts";
import { inter } from "./interFont";
import { sora } from "./fonts";
import { SidebarNav, AccountMenu } from "./SidebarNav";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} font-sora`}>
      <body className="font-sora antialiased">
        <Tooltip.Provider>
          <div className="flex min-h-screen">
            <SidebarNav />
            <div className="flex-1 flex flex-col">
              <div className="w-full flex justify-end items-center px-8 py-4">
                <AccountMenu />
              </div>
              <motion.main
                className="flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {children}
              </motion.main>
            </div>
          </div>
        </Tooltip.Provider>
      </body>
    </html>
  );
}
