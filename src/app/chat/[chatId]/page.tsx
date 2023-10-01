/** @format */

import { getMessages } from "@/actions/get";
import ChatPanel from "@/components/ChatPanel";
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    chatId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const session = await getAuthSession();
  if (!session) redirect("/");
  const res = await getMessages(params.chatId);
  if (!res) redirect("/")
  const messages = res;
  return (
    <div className="flex">
      <Sidebar user={session.user} />
      <div className="w-full">
        <ChatPanel
          user={session.user}
          chatId={params.chatId}
          chatMessages={messages}
        />
      </div>
    </div>
  );
};

export default Page;
