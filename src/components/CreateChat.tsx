/** @format */
"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { UsersIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createChat } from "@/actions/chats";
import { Chat, Response } from "@/actions/types";

interface Props {
  userEmail: string;
  onFailure: (text: string) => any;
  onSuccess: (chat: Chat) => any;
}

const CreateChat: React.FC<Props> = ({ userEmail, onFailure, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  async function helper() {
    const res = await createChat([email, userEmail], "chat", name);
    setOpen(false);
    if (res === Response.SERVER_ERROR) {
      onFailure("The user your trying to find does not exist");
    } else if (res === Response.CONFILCT) {
      onFailure("The DM already exists");
    } else {
      onSuccess(res);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger
        onClick={() => setOpen(true)}
        className="rounded-full bg-slate-50 dark:bg-slate-800 p-2 ml-auto"
      >
        <UsersIcon strokeWidth={1} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Chat</DialogTitle>
          <DialogDescription className="mt-2">
            <section className="flex flex-col gap-1">
              <h3 className="pl-1 font-medium text-black dark:text-white">
                Name
              </h3>
              <Input placeholder="Name" />
              <h3 className="pl-1 font-medium text-black dark:text-white">
                Email
              </h3>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                onKeyDown={(e) => {
                  if (e.key === "Enter") helper();
                }}
              />
              <Button
                onClick={helper}
                variant="secondary"
                className="mt-1 bg-blue-500"
              >
                Create
              </Button>
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChat;
