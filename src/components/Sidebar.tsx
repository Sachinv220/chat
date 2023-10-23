/** @format */
import React, { ReactNode } from "react";
import Chat from "./Chat";
import SearchChat from "./SearchChat";
import UserNav from "./UserNav";
import { redirect } from "next/navigation";
import { getChats } from "@/actions/chats";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
const AddChat = dynamic(() => import("@/components/AddChat"));

interface Props {
  user: Session["user"];
  children: ReactNode;
}

const Sidebar: React.FC<Props> = async ({ user, children }) => {
  const res = await getChats(user);
  if (!res) redirect("/login");
  const chats = res;
  return (
    <>
      <nav className="fixed top-0 left-0 h-screen w-[28%]">
        <div className="flex flex-col w-full h-screen shadow-md border-r">
          <div className="flex w-full items-center p-1">
            <UserNav
              image={user.image || undefined}
              name={user.name || undefined}
              email={user.email || undefined}
            />
            <AddChat userEmail={user.email as string} />
          </div>
          <form className="flex w-full gap-1 shadow-sm">
            <SearchChat chats={chats.map((chat) => chat)} />
          </form>
          <div className="pt-3">
            {chats.map((chat) => (
              <Chat lastMessage={chat.messages} key={chat.id} chat={chat} />
            ))}
          </div>
        </div>
      </nav>
      <div className="ml-[28%]">{children}</div>
    </>
  );
};

export default Sidebar;
