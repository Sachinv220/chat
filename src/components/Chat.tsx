/** @format */
import Link from "next/link";
import React from "react";
import { Chat } from "@/lib/types";

interface Props {
  chat: Chat;
}

const Chat: React.FC<Props> = ({ chat }) => {
  return (
    <Link href={`${process.env.NEXTAUTH_URL}/chat/${chat.id}`}>
      <div className="cursor-pointer bg-slate-200 dark:bg-slate-900 px-1 pt-2 h-16">
        <h1 className="font-semibold text-xl">{chat.name}</h1>
      </div>
      <hr/>
    </Link>
  );
};

export default Chat;
