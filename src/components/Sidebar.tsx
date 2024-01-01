/** @format */
"use client";
import React, { ReactNode, useState } from "react";
import Chat from "./Chat";
import SearchChat from "./SearchChat";
import UserNav from "./UserNav";
import { Chat as TChat } from "@/actions/types";
import { Session } from "next-auth";
import AddChat from "./AddChat";
import { usePathname } from "next/navigation";
import { Toaster, toast } from "sonner";
import { useTheme } from "next-themes";
import { DataProvider } from "./data-provider";

interface Props {
  user: Session["user"];
  children: ReactNode;
  allChats: TChat[];
}

const Sidebar: React.FC<Props> = ({ user, children, allChats }) => {
  const [chats, setChats] = useState(allChats);
  const path = usePathname().split("/");
  let className = "";
  const { resolvedTheme } = useTheme();
  if (path.length === 2) className = "sidebar";
  if (path.length === 3) className = "sidebar-disabled";

  function addChat(chat: TChat) {
    setChats((prev) => [...prev, chat]);
  }

  return (
    <DataProvider value={{ chats }}>
      <Toaster
        richColors
        theme={resolvedTheme as "light" | "dark" | "system" | undefined}
      />
      <nav className={`fixed top-0 left-0 h-screen w-[28%] ${className}`}>
        <div className="flex flex-col w-full h-screen shadow-md border-r">
          <div className="flex w-full items-center p-1 bg-slate-900 h-16">
            <UserNav user={user} />
            <AddChat
              onSuccess={addChat}
              onFailure={toast}
              userEmail={user.email || ""}
            />
          </div>
          <div className="flex w-full rounded-none gap-1 shadow-sm">
            <SearchChat userId={user.id} chats={chats.map((chat) => chat)} />
          </div>
          <div className="pt-3">
            {chats.map((chat) => (
              <Chat userId={user.id} key={chat.id} chat={chat} />
            ))}
          </div>
        </div>
      </nav>
      <div className={`content-show ${className === "sidebar" && "hidden"}`}>
        {children}
      </div>
    </DataProvider>
  );
};

export default Sidebar;
