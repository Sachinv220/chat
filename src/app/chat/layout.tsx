/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat app",
  description: "Chat application",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="flex">
              <Sidebar/>
              {children}
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
