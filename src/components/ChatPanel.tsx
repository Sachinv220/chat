/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import ChatBubble from "./ChatBubble";
import { Message } from "@/actions/types";
import { createMessage } from "@/actions/messages";
import { Session } from "next-auth";
import { pusherClient } from "@/lib/pusher";
import { deleteMessage as remove } from "@/actions/messages";
import { generateMessage } from "@/lib/utils";

interface LoadingMessage extends Message {
  loading?: boolean;
}

interface Props {
  chatMessages: LoadingMessage[];
  chatId: string;
  user: Session["user"];
}

const ChatPanel: React.FC<Props> = ({ chatId, chatMessages, user }) => {
  const [messages, setMessages] = useState(chatMessages);
  const [text, setText] = useState("");
  const [tempMessage, setTempMessage] = useState("");

  async function handleSubmit() {
    setTempMessage(text);
    const message = await createMessage(text, chatId, user?.id || "");
    if (message) {
      setMessages([...messages, message]);
      setTempMessage("");
    }
  }

  useEffect(() => {
    pusherClient.subscribe(chatId);

    const handleNewMessage = (message: Message) => {
      if (message.id !== messages.at(-1)?.id)
        setMessages((prev) => {
          return [...prev, message];
        });
    };

    pusherClient.bind("add_message", handleNewMessage);

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("add_message", handleNewMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  async function deleteMessage(messageId: string) {
    setMessages(messages.filter((message) => message.id !== messageId));
    await remove(messageId);
  }

  function showIcon(index: number) {
    return (
      messages[index].user.id !== messages.at(index - 1)?.user.id || !index
    );
  }

  return (
    <div className="flex flex-col h-screen px-3">
      <div className="mb-5">
        {messages.map((message, index) => (
          <ChatBubble
            onDelete={deleteMessage}
            align={message.user.id === user.id}
            key={message.id}
            message={message}
            icon={showIcon(index)}
          />
        ))}
        {tempMessage && <ChatBubble {...generateMessage(tempMessage, user)} />}
      </div>
      <div className="flex mt-auto px-8 gap-3 mb-3">
        <Input
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
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
