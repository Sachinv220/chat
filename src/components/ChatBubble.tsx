/** @format */
"use client";
import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface Props {
  message: Message;
  align: boolean;
}

const ChatBubble: React.FC<Props> = ({ message, align }) => {
  const bg = align ? "bg-blue-600" : "bg-indigo-600";
  const padding = align ? "ml-auto" : "";
  return (
    <div className={`flex w-fit mt-3 gap-1 ${padding}`}>
      <Avatar className="mt-1">
        <AvatarImage src={message.user.image || ""}></AvatarImage>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div
        className={cn("flex flex-col w-fit rounded-md bg-bl p-1 h-fit", bg)}
      >
        <p className="text-xs">{message.user.name}</p>
        <h3 className="text-md">{message.message}</h3>
      </div>
    </div>
  );
};

export default ChatBubble;
