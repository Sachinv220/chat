/** @format */

import React from "react";
import Chat from "./Chat";
import SearchChat from "./SearchChat";
import UserNav from "./UserNav";
import { redirect } from "next/navigation";
import { getChats } from "@/actions/chats";

const Sidebar = async () => {
  const res = await getChats();
  if (!res) redirect("/signin");
  const { user, chats } = res;
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
