/** @format */
"use server";
import { prisma } from "@/lib/db";
import { Message } from "./types";
import { getAuthSession } from "@/lib/nextauth";

export async function createMessage(
  message: string,
  chatId: string,
  userId: string
) {
  try {
    const createdMessage: Message = await prisma.message.create({
      data: {
        message: message,
        chat: {
          connect: { id: chatId },
        },
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: {
          select: {
            image: true,
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return createdMessage;
  } catch (e) {
    return false;
  }
}


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
