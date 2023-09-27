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
  loading?: boolean;
}

interface Props {
  chatMessages: LoadingMessage[];
  user: Message["user"];
  chatId: string;
}

const ChatPanel: React.FC<Props> = ({ chatId, chatMessages, user }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [text, setText] = useState("");
  const [loadingText, setLoadingText] = useState("");

  async function handleSubmit() {
    setLoadingText(text);
    const message = await createMessage(text, chatId);
    if (!message) return;
    setMessages([...messages, message]);
    setLoadingText("");
  }

  return (
    <div className="flex flex-col w-full h-full p-3">
      <div>
        {messages.map((message) => (
          <ChatBubble
            align={message.user.id === user.id}
            key={message.id}
            message={message}
          />
        ))}
        {loadingText.length > 0 && (
          <ChatBubble
            align={true}
            message={{
              user,
              message: loadingText,
              id: Math.random().toString(),
              dateTime: new Date(),
            }}
            loading={true}
          />
        )}
      </div>
      <div className="flex gap-3 mt-auto ">
        <Input
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" ?? handleSubmit()}
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
