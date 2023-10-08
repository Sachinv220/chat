/** @format */
"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import ChatBubble from "./ChatBubble";
import { Message } from "@/actions/types";
import { createMessage } from "@/actions/post";
import { Session } from "next-auth";

interface LoadingMessage extends Message {
  loading?: boolean;
}

interface Props {
  chatMessages: LoadingMessage[];
  chatId: string;
  user: Session["user"]
}

const ChatPanel: React.FC<Props> = ({ chatId, chatMessages, user}) => {
  const [messages, setMessages] = useState(chatMessages);
  const [text, setText] = useState("");
  const [tempMessage, setTempMessage] = useState("");

  async function handleSubmit() {
    setTempMessage(text);
    const message = await createMessage(text, chatId, user?.id || "");
    if (!message) return;
    setMessages([...messages, message]);
    setTempMessage("");
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
        {tempMessage && (
          <ChatBubble
            align={true}
            key={Math.random().toString()}
            loading={true}
            message={{
              dateTime: new Date(),
              id: Math.random().toString(),
              message: tempMessage,
              user: user,
            }}
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
