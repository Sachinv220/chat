/** @format */

import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import Chat from "./Chat";
import SearchChat from "./SearchChat";
import UserNav from "./UserNav";
import { Button } from "./ui/button";
import { User } from "next-auth";

interface Props {
  chats: Chat[];
  user: Pick<User, "image" | "name" | "email">;
}

const Sidebar: React.FC<Props> = ({ chats, user }) => {
  return (
    <nav className="flex flex-col w-4/12 h-screen shadow-md border-r-2">
      <div className="flex w-full items-center p-1">
        <UserNav
          image={user.image || undefined}
          name={user.name || undefined}
          email={user.email || undefined}
        />
      </div>
      <form className="flex w-full gap-1 shadow-sm">
        <SearchChat chats={chats.map((chat) => chat.name)} />
        <Button className="bg-transparent m-0 mx-1 p-0 w-10 rounded-full my-1">
          <PlusIcon color="white" />
        </Button>
      </form>
      <div className="pt-3">
        {chats.map((chat) => (
          <Chat chat={chat} />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
