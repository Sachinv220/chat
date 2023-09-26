/** @format */

import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import Chat from "./Chat";
import SearchChat from "./SearchChat";
import UserNav from "./UserNav";
import { Button } from "./ui/button";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import Album from "./Album";

const getChats = async (email: string) => {
  const data = await fetch(
    `${process.env.NEXTAUTH_URL}/api/chat?email=${email}`,
    { cache: "force-cache" }
  );
  const res = await data.json();
  return res as Chat[];
};

const Sidebar: React.FC<{}> = async () => {
  const session = await getAuthSession();
  if (!session) redirect("/signin");
  const { user } = session;
  const chats = await getChats(user.email || "");
  return (
    <nav className="flex flex-col w-4/12 h-screen shadow-md border-r">
      <div className="flex w-full items-center p-1">
        <UserNav
          image={user.image || undefined}
          name={user.name || undefined}
          email={user.email || undefined}
        />
      </div>
      <form className="flex w-full gap-1 shadow-sm">
        <SearchChat chats={chats.map((chat) => chat.name)} />
      </form>
      <div className="pt-3">
        {chats.map((chat) => (
          <Chat key={chat.id} chat={chat} />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
