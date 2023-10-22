/** @format */
"use client";
import Link from "next/link";
import React from "react";
import { Chat } from "@/actions/types";
import Album from "./Album";
import { usePathname } from "next/navigation";

interface Props {
  chat: Chat;
  lastMessage: Chat["messages"];
}

const Chat: React.FC<Props> = ({ chat, lastMessage }) => {
  const { participants } = chat;
  const id = usePathname().split("/").at(2);
  let bg = "";
  if (id && id == chat.id) bg = "dark:bg-slate-800 bg-slate-100";
  const message = lastMessage[0];
  return (
    <Link href={`/chat/${chat.id}`} className={`flex w-full bg-slate ${bg}`}>
      <Album images={participants.map((par) => par.image || "")} />
      <div className="flex flex-col w-full ml-1">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {chat.name}
        </h3>
        <p className="text-sm leading-7 text-muted-foreground truncate">
          {message.user.name}: {message.message}
        </p>
        <hr className="w-full" />
      </div>
    </Link>
  );
};

export default Chat;
