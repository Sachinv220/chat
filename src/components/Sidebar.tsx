/** @format */
"use client";
import React, { ReactNode } from "react";
import Chat from "./Chat";
import SearchChat from "./SearchChat";
import UserNav from "./UserNav";
import { Chat as TChat } from "@/actions/types";
import { Session } from "next-auth";
import AddChat from "./AddChat";

interface Props {
  user: Session["user"];
  children: ReactNode;
  chats: TChat[];
}

const Sidebar: React.FC<Props> = ({ user, children, chats }) => {
  return (
    <React.Fragment>
      <nav className="fixed top-0 left-0 h-screen w-[28%]">
        <div className="flex flex-col w-full h-screen shadow-md border-r">
          <div className="flex w-full items-center p-1">
            <UserNav user={user} />
            <AddChat userEmail={user.email || ""} />
          </div>
          <form className="flex w-full gap-1 shadow-sm">
            <SearchChat chats={chats.map((chat) => chat)} />
          </form>
          <div className="pt-3">
            {chats.map((chat) => (
              <Chat userId={user.id} key={chat.id} chat={chat} />
            ))}
          </div>
        </div>
      </nav>
      <div className="ml-[28%]">{children}</div>
    </React.Fragment>
  );
};

export default Sidebar;
