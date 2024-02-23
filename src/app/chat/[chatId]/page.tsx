/** @format */

import { getMessages } from "@/actions/messages";
import { Response } from "@/actions/types";
import ChatPanel from "@/components/ChatPanel";
import Navbar from "@/components/Navbar";
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
  if (!session) return redirect("/login");
  const { user } = session;

  const res = await getMessages(params.chatId, user.id);
  if (!res) redirect("/login");

  if (res === Response.SERVER_ERROR) {
    return <div>Failed to Load Messages</div>;
  }

  return (
    <div className="w-full">
      <Navbar userId={user.id} />
      <ChatPanel user={user} chatId={params.chatId} chatMessages={res} />
    </div>
  );
};

export default Page;
