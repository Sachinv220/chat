/** @format */
"use server";
import { prisma } from "@/lib/db";
import { Chat, Response } from "./types";
import { Session } from "next-auth";
import { chatQuery } from "./queries";

export async function getChats(user: Session["user"]) {
  try {
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
  } catch (e) {
    return Response.SERVER_ERROR;
  }
}

export async function createChat(
  participants: string[],
  type: "chat" | "dm",
  name?: string
) {
  try {
    let res = 0;
    if (type === "dm") {
      res = await prisma.chat.count({
        where: {
          type,
          participants: {
            every: {
              email: {
                in: participants,
              },
            },
          },
        },
      });
    }
    console.log(res);
    if (res > 1) return Response.CONFILCT;

    const chat: Chat = await prisma.chat.create({
      data: {
        name: name || "",
        participants: {
          connect: participants.map((email) => ({
            email: email,
          })),
        },
        type,
      },
      ...chatQuery,
    });
    return chat;
  } catch (e) {
    return Response.SERVER_ERROR;
  }
}
