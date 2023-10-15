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
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createChat } from "@/actions/chats";

interface Props {
  userEmail: string;
}

const AddChat: React.FC<Props> = ({ userEmail }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function helper() {
    const chat = await createChat(name, [email, userEmail]);
  }

  return (
    <Dialog>
      <DialogTrigger className="rounded-full bg-slate-200 dark:bg-slate-800 p-2 ml-auto">
        <PlusIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Chat</DialogTitle>
          <DialogDescription className="mt-2">
            <h3 className="pl-1 font-medium text-black dark:text-white">
              Name
            </h3>
            <form onSubmit={helper} className="flex flex-col gap-1">
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="johndoe"
              />
              <h3 className="pl-1 font-medium text-black dark:text-white">
                Email
              </h3>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="johndoe@gmail.com"
              />
              <Button variant="secondary" className="mt-1 bg-blue-500">
                Enter
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddChat;