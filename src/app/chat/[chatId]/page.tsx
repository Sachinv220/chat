/** @format */

import ChatPanel from "@/components/ChatPanel";
import { getAuthSession } from "@/lib/nextauth";
import { Message } from "@/lib/types";
import React from "react";

interface Props {
  params: {
    chatId: string;
  };
}

const getMessages = async (chatId: string) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/messages?chatId=${chatId}`,
    { cache: "force-cache" }
  );
  const data = await res.json();

  return data as Message[];
};

const Page: React.FC<Props> = async ({ params }) => {
  const messages = await getMessages(params.chatId);
  const session = await getAuthSession();
  const { id } = session?.user!;
  return (
    <div className="w-full">
      <ChatPanel userId={id} chatMessages={messages} />
    </div>
  );
};

export default Page;
