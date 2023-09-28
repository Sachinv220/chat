/** @format */
"use server";
import { prisma } from "@/lib/db";
import { Message } from "./types";

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
