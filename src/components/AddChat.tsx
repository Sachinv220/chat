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
  const [email, setEmail] = useState("");

  async function helper() {
    await createChat([email, userEmail], "");
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
            <form onSubmit={helper} className="flex flex-col gap-1">
              <h3 className="pl-1 font-medium text-black dark:text-white">
                Email
              </h3>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
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
