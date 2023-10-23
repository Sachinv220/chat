/** @format */
"use client";
import Link from "next/link";
import React from "react";
import { Chat } from "@/actions/types";
import Album from "./Album";
import { usePathname } from "next/navigation";

interface Props {
  chat: Chat;
}

const Chat: React.FC<Props> = ({ chat }) => {
  const { participants } = chat;
  const id = usePathname().split("/").at(2);
  let bg = "";

  if (id === chat.id) bg = "dark:bg-slate-800 bg-slate-100";
  const message = chat.messages.at(0);
  return (
    <Link href={`/chat/${chat.id}`} className={`flex w-full ${bg} px-1`}>
      <Album images={participants.map((par) => par.image || "")} />
      <div className="flex flex-col w-full ml-1">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {chat.name}
        </h3>
        <p className="text-sm leading-7 h-7 text-muted-foreground line-clamp-1">
          {message
            ? `${message.user.name}: ${message.message}`
            : "Recently Created"}
        </p>
        <hr className="w-full" />
      </div>
    </Link>
  );
};

export default Chat;
