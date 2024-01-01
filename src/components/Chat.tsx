/** @format */
"use client";
import Link from "next/link";
import React from "react";
import { type Chat as TChat } from "@/actions/types";
import Album from "./Album";
import { usePathname } from "next/navigation";
import { getChatName, getImages } from "@/lib/utils";

interface Props {
  chat: TChat;
  userId: string;
}

const Chat: React.FC<Props> = ({ chat, userId }) => {
  const id = usePathname().split("/").at(2);
  let bg = "";

  if (id === chat.id) bg = "dark:bg-slate-800 bg-slate-100";
  const message = chat.messages.at(0);
  return (
    <Link href={`/chat/${chat.id}`} className={`flex w-full ${bg} px-1`}>
      <Album images={getImages(chat, userId)} className="h-12 w-12" />
      <div className="flex flex-col w-full ml-1">
        <h3 className="scroll-m-20 text-lg font-medium tracking-tight line-clamp-1">
          {getChatName(chat, userId) || "Untitled Group"}
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
