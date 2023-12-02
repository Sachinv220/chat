/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { getChats } from "@/actions/chats";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Coffee | Chats",
  description: "Chat application",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  if (!session) return redirect("/login");
  const chats = await getChats(session.user);

  return (
    <html lang="en">
      <head>
        <title>Chat Coffee | Chats</title>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Sidebar allChats={chats} user={session.user}>
            {children}
          </Sidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}
