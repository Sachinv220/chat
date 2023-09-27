/** @format */

import { getMessages } from "@/actions/get";
import ChatPanel from "@/components/ChatPanel";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    chatId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const res = await getMessages(params.chatId);
  if (!res) redirect("/signin");
  const { messages, user } = res;
  return (
    <div className="w-full">
      <ChatPanel
        chatId={params.chatId}
        userId={user.id}
        chatMessages={messages}
      />
    </div>
  );
};

export default Page;
