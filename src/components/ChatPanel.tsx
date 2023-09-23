/** @format */
"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import ChatBubble from "./ChatBubble";
import { Message } from "@/lib/types";

interface Props {
  chatMessages: Message[];
  userId: string;
}

const ChatPanel: React.FC<Props> = ({ chatMessages, userId }) => {
  return (
    <div className="flex flex-col w-full h-full p-3">
      <div>
        {chatMessages.map((message) => (
          <ChatBubble
            align={message.user.id === userId}
            key={message.id}
            message={message}
          />
        ))}
      </div>
      <form
        className="flex gap-3 mt-auto bg-slate-900"
        onSubmit={() => console.log("Form Submitted")}
      >
        <Input placeholder="Send a Message" />
        <Button>
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  );
};

export default ChatPanel;
