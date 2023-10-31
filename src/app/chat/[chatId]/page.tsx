/** @format */

import { getMessages } from "@/actions/messages";
import ChatPanel from "@/components/ChatPanel";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    chatId: string;
  };
}
export const dynamic = "force-dynamic";

const Page: React.FC<Props> = async ({ params }) => {
  const res = await getMessages(params.chatId);
  if (!res) redirect("/login");
  const { messages, user } = res;
  return (
    <div className="w-full">
      <ChatPanel user={user} chatId={params.chatId} chatMessages={messages} />
    </div>
  );
};

export default Page;
