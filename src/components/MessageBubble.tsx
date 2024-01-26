/** @format */
"use client";
import { Message } from "@/actions/types";
import { getInitials } from "@/lib/utils";
import React from "react";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { Trash2Icon as TrashIcon } from "lucide-react";

interface Props {
  message: Message;
  align: boolean;
  loading?: true;
  icon?: boolean;
  onDelete: (messageId: string) => any;
}

const MessageBubble: React.FC<Props> = ({
  message,
  align,
  loading,
  onDelete,
  icon,
}) => {
  let bg = !align
    ? "bg-slate-200 text-black dark:bg-slate-800 dark:text-white"
    : "text-white bg-blue-600";
  if (loading) bg = "dark:bg-slate-800 bg-slate-200";
  const padding = align ? "ml-auto" : "";
  const showImage = !align && icon;
  return (
    <div className={`flex w-fit gap-1 px-2 ${padding}`}>
      <Avatar className="w-8 h-8 rounded-full">
        {showImage && (
          <Image
            alt={getInitials(message.user.name)}
            width={100}
            height={100}
            src={message.user.image || ""}
          />
        )}
      </Avatar>
      <div className="flex flex-col">
        {showImage && (
          <p className="text-sm text-muted-foreground">{message.user.name}</p>
        )}
        <div className="flex">
          {align && (
            <button
              className="opacity-0 hover:opacity-100"
              onClick={() => onDelete(message.id)}
            >
              <TrashIcon height={10 * 2} color="red" />
            </button>
          )}
          <div className={`flex flex-col w-fit rounded-md p-2 h-fit ${bg}`}>
            <h3 className="text-sm">{message.message}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
