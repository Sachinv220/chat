/** @format */
"use client";
import React, {
  ElementRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import MessageBubble from "./MessageBubble";
import { Message, Response } from "@/actions/types";
import { createMessage } from "@/actions/messages";
import { Session } from "next-auth";
import { pusherClient } from "@/lib/pusher";
import { deleteMessage as remove } from "@/actions/messages";
import { generateMessage } from "@/lib/utils";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getMessages } from "@/actions/messages";

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
  const [tempMessage, setTempMessage] = useState("");
  const inputRef = useRef<ElementRef<"input">>(null);
  const getNewMesssages = useInfiniteScroll();
  const canFetch = useRef(true);

  useEffect(() => {
    async function helper() {
      const newMessages = await getMessages(
        chatId,
        user.id,
        messages.at(0)?.dateTime
      );
      if (newMessages === Response.SERVER_ERROR) return;
      if (newMessages.length === 0) canFetch.current = false;
      setMessages((prev) => [...newMessages, ...prev]);
    }

    if (getNewMesssages && canFetch.current) {
      helper();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNewMesssages, chatId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!inputRef.current) return;

    const tempText = inputRef.current.value.trim();
    inputRef.current.value = "";

    if (!tempText) return;

    setTempMessage(tempText);
    const message = await createMessage(tempText, chatId, user?.id || "");
    if (message !== Response.SERVER_ERROR) {
      setMessages([...messages, message]);
      setTempMessage("");
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
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

  const handleDeleteMessage = useCallback(
    async (messageId: string) => {
      setMessages((prev) => prev.filter((message) => message.id !== messageId));
      await remove(messageId, user.id);
    },
    [user.id]
  );

  function showIcon(index: number) {
    return (
      messages.at(index)?.user.id !== messages.at(index - 1)?.user.id || !index
    );
  }

  return (
    <React.Fragment>
      <div className="flex flex-col pt-10 h-screen px-3 gap-0.5 mb-10">
        {messages.map((message, index) => (
          <MessageBubble
            onDelete={handleDeleteMessage}
            align={message.user.id === user.id}
            key={message.id}
            message={message}
            icon={showIcon(index)}
          />
        ))}
        {messages.length === 0 && (
          <h1 className="mt-10 text-center scroll-m-20 text-2xl font-semibold tracking-tight">
            No Messages in this Chat
          </h1>
        )}
        {tempMessage && (
          <MessageBubble {...generateMessage(tempMessage, user)} />
        )}
      </div>
      <div className="fixed bottom-0 w-full h-10 backdrop-blur-md mt-10">
        <form className="flex px-3 gap-1" onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            className="w-[67%] outline-blue-100"
            placeholder="Send a Message"
          />
          <Button className="bg-slate-100 hover:bg-slate-50">
            <PaperPlaneIcon />
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ChatPanel;
