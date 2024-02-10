/** @format */

import { Chat } from "@/actions/types";
import { type ClassValue, clsx } from "clsx";
import { Session } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name?: string | null) => {
  if (!name) return "";
  let ini = name.split(" ");
  if (ini.length === 1) return ini[0][0];
  return ini[0][0] + ini[1][0];
};

export function generateMessage(message: string, user: Session["user"]) {
  return {
    onDelete: () => {},
    align: true,
    loading: true,
    key: Math.random().toString(),
    message: {
      dateTime: new Date(),
      id: Math.random().toString(),
      message: message,
      user: user,
    },
  } as const;
}

export function getChatName(chat: Chat | null, userId: string) {
  if (!chat) return "";
  if (chat.participants.length === 1) return "You";
  if (chat.type === "chat") {
    return chat.name;
  }
  return chat.participants.find((user) => user.id !== userId)?.name;
}

export function getImages(chat: Chat | null, userId: string): string[] {
  if (!chat) return [""];
  else if (chat.participants.length === 1)
    return [chat.participants[0].image || ""];
  else if (chat.participants.length === 2)
    return [chat.participants.find((par) => par.id !== userId)?.image || ""];

  let images: string[] = [];
  for (let i = 0; i < chat.participants.length; i++) {
    images.push(chat.participants[i].image || "");
  }
  return images;
}
