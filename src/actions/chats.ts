/** @format */

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { Session } from "next-auth";

export type Chat = {
  id: string;
  name: string;
  participants: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  }[];
};

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
