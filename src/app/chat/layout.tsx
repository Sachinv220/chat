/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="flex">
              <Sidebar user={session.user} />
              {children}
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
