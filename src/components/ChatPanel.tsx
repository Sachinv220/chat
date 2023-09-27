/** @format */
"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import ChatBubble from "./ChatBubble";
import { Message } from "@/actions/types";
import { createMessage } from "@/actions/post";

interface LoadingMessage extends Message {
  loading?: string;
}

interface Props {
  chatMessages: LoadingMessage[];
  userId: string;
  chatId: string;
}

const ChatPanel: React.FC<Props> = ({ chatId, chatMessages, userId }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [text, setText] = useState("");

  async function handleSubmit() {
    const message = await createMessage(text, chatId);
    if (!message) return;
    setMessages([...messages, message]);
  }
  return (
    <div className="flex flex-col w-full h-full p-3">
      <div>
        {messages.map((message) => (
          <ChatBubble
            align={message.user.id === userId}
            key={message.id}
            message={message}
          />
        ))}
      </div>
      <div
        className="flex gap-3 mt-auto "
        onSubmit={() => console.log("Form Submitted")}
      >
        <Input
          onChange={(e) => setText(e.target.value)}
          placeholder="Send a Message"
          className="bg-slate-100 dark:bg-slate-900"
        />
        <Button onClick={handleSubmit}>
          <PaperPlaneIcon />
        </Button>
      </div>
    </div>
  );
};

export default ChatPanel;
