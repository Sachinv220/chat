/** @format */
"use server";
import { prisma } from "@/lib/db";
import { Chat } from "./types";
import { Session } from "next-auth";

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

export async function createChat(name: string, participants: string[]) {
  try {
    console.log(participants);
    const chat = await prisma.chat.create({
      data: {
        name: name,
        participants: {
          connect: participants.map((email) => ({
            email: email,
          })),
        },
      },
    });
    return chat;
  } catch (e) {
    return false;
  }
}

