/** @format */
import { prisma } from "@/lib/db";
import { Chat, Message } from "./types";
import { Session } from "next-auth";
import { getAuthSession } from "@/lib/nextauth";

export async function getMessages(chatId: string) {
  if (!chatId) return false;

  const session = await getAuthSession();
  if (!session) return false;
  const { user } = session;

  const messages: Message[] = await prisma.message.findMany({
    select: {
      id: true,
      message: true,
      user: {
        select: {
          id: true,
          image: true,
          name: true,
          email: true,
        },
      },
      dateTime: true,
    },
    where: {
      chat: {
        id: chatId,
      },
    },
  });
  return {messages, user};
}

export async function getChats(user: Session["user"]) {
  const chats: Chat[] = await prisma.chat.findMany({
    select: {
      id: true,
      name: true,
      participants: {
        select: {
          name: true,
          email: true,
          image: true,
          id: true,
        },
      },
    },
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
