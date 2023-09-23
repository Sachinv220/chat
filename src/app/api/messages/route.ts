/** @format */
import { z } from "zod";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const postMessage = z.object({
  chatId: z.string(),
  userEmail: z.string(),
  message: z.string(),
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const data = new URLSearchParams(url.search);
  const chatId = data.get("chatId");

  if (!chatId)
    return NextResponse.json({ message: "Invalid Request" }, { status: 300 });

  const res = await prisma.message.findMany({
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
  return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ok = postMessage.safeParse(body);

  if (!ok.success)
    return NextResponse.json({ message: "Invalid Request" }, { status: 300 });

  const { message, userEmail, chatId } = ok.data;

  try {
    const createdMessage = await prisma.message.create({
      data: {
        message: message,
        chat: {
          connect: { id: chatId },
        },
        user: {
          connect: { email: userEmail },
        },
      },
    });
    return NextResponse.json(createdMessage);
  } catch (e) {
    return NextResponse.json({ message: "Request Failed" }, { status: 300 });
  }
}
