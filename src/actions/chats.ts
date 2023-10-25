/** @format */
"use server";
import { prisma } from "@/lib/db";
import { Chat } from "./types";
import { Session } from "next-auth";
import { chatQuery } from "./queries";

export async function getChats(user: Session["user"]) {
  const chats: Chat[] = await prisma.chat.findMany({
    ...chatQuery,
    where: {
      participants: {
        some: {
          id: user.id,
        },
      },
    },
  });

  return chats;
}

export async function createChat(participants: string[], name?: string) {
  try {
    const chat: Chat = await prisma.chat.create({
      data: {
        name: name,
        participants: {
          connect: participants.map((email) => ({
            email: email,
          })),
        },
      },
      ...chatQuery,
    });
    return chat;
  } catch (e) {
    return false;
  }
}
