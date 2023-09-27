import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
export type Message = {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
  message: string;
  id: string;
  dateTime: Date;
};

export async function getMessages(chatId: string) {
  const session = await getAuthSession();
  if (!chatId || !session) return false;

  const { user} = session;

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

