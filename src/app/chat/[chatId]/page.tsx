/** @format */

import { getMessages } from "@/actions/messages";
import { Message, Response } from "@/actions/types";
import ChatPanel from "@/components/ChatPanel";
import Navbar from "@/components/Navbar";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    chatId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const res = await getMessages(params.chatId);
  if (!res) redirect("/login");
  if (res === Response.SERVER_ERROR) {
    return <div>Failed to Load Messages</div>;
  }
  const { messages, user } = res;
  return (
    <div className="w-full">
      <Navbar userId={user.id} />
      <ChatPanel user={user} chatId={params.chatId} chatMessages={messages} />
    </div>
  );
};

export default Page;
