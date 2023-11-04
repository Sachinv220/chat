/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { getChats } from "@/actions/chats";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Coffee",
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Sidebar allChats={chats} user={session.user}>
            {children}
          </Sidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}
