/** @format */
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { Chat } from "./types";
import { Session } from "next-auth";

export async function getMessages(chatId: string) {
  const session = await getAuthSession();
  if (!chatId || !session) return false;

  const { user } = session;

  const messages = await prisma.message.findMany({
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
    take: 10,
  });
  return { user, messages };
}

export async function getChats() {
  const session = await getAuthSession();

  if (!session) return false;

  const user: Session["user"] = session.user;

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
    take: 10
  });

  return { user, chats };
}