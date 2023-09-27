/** @format */
import Link from "next/link";
import React from "react";
import { Chat } from "@/actions/post";
import Album from "./Album";

interface Props {
  chat: Chat;
}

const Chat: React.FC<Props> = ({ chat }) => {
  const { participants } = chat;
  return (
    <Link href={`${process.env.NEXTAUTH_URL}/chat/${chat.id}`}>
      <div className="flex cursor-pointer bg-slate-100 dark:bg-slate-900 h-16 px-1">
        <Album images={participants.map((par) => par.image || "")} />
        <h1 className="font-semibold text-md mt-1">{chat.name}</h1>
      </div>
      <hr />
    </Link>
  );
};

export default Chat;
