/** @format */
"use client";
import { Message } from "@/actions/types";
import { getInitials } from "@/lib/utils";
import React, { memo } from "react";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { TrashIcon } from "@radix-ui/react-icons";

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
    ? "bg-slate-200 dark:bg-indigo-500"
    : "text-white bg-blue-500";
  if (loading) bg = "dark:bg-slate-800 bg-slate-200";
  const padding = align ? "ml-auto" : "";
  return (
    <div className={`flex w-fit mt-3 gap-1 px-4 ${padding}`}>
      <Avatar className="mt-1 w-8 h-8 rounded-full">
        {icon && (
          <Image
            alt={getInitials(message.user.name)}
            width={100}
            height={100}
            src={message.user.image || ""}
          />
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

export default memo(MessageBubble);
