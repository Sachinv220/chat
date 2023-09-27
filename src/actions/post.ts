/** @format */
"use server"
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { Message } from "./types";

export async function createMessage(message: string, chatId: string) {
  const session = await getAuthSession();
  if (!session) return false;
  const { user } = session;
  try {
    const createdMessage: Message = await prisma.message.create({
      data: {
        message: message,
        chat: {
          connect: { id: chatId },
        },
        user: {
          connect: { id: user.id },
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
