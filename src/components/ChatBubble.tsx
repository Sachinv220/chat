/** @format */
"use client";
import { Message } from "@/actions/types";
import { getInitials } from "@/lib/utils";
import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";

interface Props {
  message: Message;
  align: boolean;
  loading?: true;
}

const ChatBubble: React.FC<Props> = ({ message, align, loading }) => {
  let bg = !align ? "bg-slate-300 dark:bg-indigo-500" : "dark:bg-blue-600 bg-blue-500";
  if (loading) bg = " dark:bg-slate-800 bg-slate-200";
  const padding = align ? "ml-auto" : "";
  return (
    <div className={`flex w-fit mt-3 gap-1 ${padding}`}>
      <Avatar className="mt-1">
        {message.user.image ? (
          <Image alt="" src={message.user.image || ""} width={40} height={40} />
        ) : (
          <AvatarFallback>{getInitials(message.user.name)}</AvatarFallback>
        )}
      </Avatar>
      <div className={`flex flex-col w-fit rounded-md p-1 h-fit ${bg}`}>
        <p className="text-xs">{message.user.name}</p>
        <h3 className="text-md">{message.message}</h3>
      </div>
    </div>
  );
};

export default ChatBubble;
