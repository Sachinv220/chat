/** @format */
"use client";
import { Message } from "@/actions/types";
import { getInitials } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { TrashIcon } from "@radix-ui/react-icons";

interface Props {
  message: Message;
  align: boolean;
  loading?: true;
  icon?: boolean;
  onDelete: (messageId: string) => any;
}

const ChatBubble: React.FC<Props> = ({
  message,
  align,
  loading,
  onDelete,
  icon,
}) => {
  let bg = !align
    ? "bg-slate-200 dark:bg-indigo-500"
    : "text-white bg-blue-500";
  if (loading) bg = "dark:bg-slate-800 bg-slate-200";
  const padding = align ? "ml-auto" : "";
  return (
    <div className={`flex w-fit mt-3 gap-1 ${padding}`}>
      <Avatar className="mt-1 w-8 h-8">
        {icon && (
          <React.Fragment>
            <AvatarImage src={message.user.image || ""} />
            <AvatarFallback>{getInitials(message.user.name)}</AvatarFallback>
          </React.Fragment>
        )}
      </Avatar>
      <div className={`flex flex-col w-fit rounded-md p-1 h-fit ${bg}`}>
        <div className="flex text-xs">
          {message.user.name}
          {align && (
            <button className="mr-auto" onClick={() => onDelete(message.id)}>
              <TrashIcon className="h-5 w-5 text-red-700" />
            </button>
          )}
        </div>
        <h3 className="text-md">{message.message}</h3>
      </div>
    </div>
  );
};

export default ChatBubble;
