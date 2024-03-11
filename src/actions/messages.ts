/** @format */
"use server";
import { prisma } from "@/lib/db";
import { Message, Response } from "./types";
import { pusherServer } from "@/lib/pusher";
import { messageQuery } from "./queries";

export async function createMessage(
  message: string,
  chatId: string,
  userId: string
) {
  try {
    const [_, createdMessage] = await prisma.$transaction([
      prisma.chat.findFirstOrThrow({
        where: {
          id: chatId,
          participants: {
            some: {
              id: userId,
            },
          },
        },
      }),
      prisma.message.create({
        data: {
          message: message,
          chat: {
            connect: { id: chatId },
          },
          user: {
            connect: { id: userId },
          },
        },
        ...messageQuery,
      }),
    ]);
    await pusherServer.trigger(chatId, "add_message", createdMessage);
    return createdMessage;
  } catch (e) {
    console.log(e);
    return Response.SERVER_ERROR;
  }
}

export async function getMessages(chatId: string, userId: string, time?: Date) {
  try {
    const messages: Message[] = await prisma.message.findMany({
      ...messageQuery,
      orderBy: {
        dateTime: "desc",
      },
      where: {
        chat: {
          id: chatId,
          participants: {
            some: {
              id: userId,
            },
          },
        },
        dateTime: {
          lt: time,
        },
      },
      take: 20,
    });

    return messages.reverse();
  } catch (e) {
    console.log(e);
    return Response.SERVER_ERROR;
  }
}

export async function deleteMessage(messageId: string, userId: string) {
  try {
    await prisma.message.delete({
      where: {
        id: messageId,
        userId,
      },
    });
  } catch (e) {
    console.log(e);
    return Response.SERVER_ERROR;
  }
}
