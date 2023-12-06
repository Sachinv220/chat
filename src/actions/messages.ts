/** @format */
"use server";
import { prisma } from "@/lib/db";
import { Message, Response } from "./types";
import { getAuthSession } from "@/lib/nextauth";
import { pusherServer } from "@/lib/pusher";
import { messageQuery } from "./queries";
import { redirect } from "next/navigation";

export async function createMessage(
  message: string,
  chatId: string,
  userId: string
) {
  try {
    await prisma.chat.findFirstOrThrow({
      where: {
        id: chatId,
        participants: {
          some: {
            id: userId,
          },
        },
      },
    });

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
      ...messageQuery,
    });
    await pusherServer.trigger(chatId, "add_message", createdMessage);
    return createdMessage;
  } catch (e) {
    return Response.SERVER_ERROR;
  }
}

export async function getMessages(chatId: string) {
  const session = await getAuthSession();
  if (!session) return redirect("/login");
  const { user } = session;
  try {
    const messages: Message[] = await prisma.message.findMany({
      ...messageQuery,
      where: {
        chat: {
          id: chatId,
        },
        AND: {
          chat: {
            participants: {
              some: {
                id: session.user.id,
              },
            },
          },
        },
      },
    });
    return { messages, user };
  } catch (e) {
    return Response.SERVER_ERROR;
  }
}

export async function deleteMessage(messageId: string) {
  try {
    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });
  } catch (e) {
    return Response.SERVER_ERROR;
  }
}
