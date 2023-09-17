/** @format */
"use client";
import React, { FC } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Props {
  chats: string[];
}

const SearchChat: FC<Props> = ({ chats }) => {
  const [showChats, setShowChats] = React.useState(false);
  return (
    <Command>
      <div className="dark:bg-slate-900 bg-slate-100">
        <CommandInput
          onClick={(e) => setShowChats(true)}
          placeholder="Search..."
        />
      </div>
      {showChats ?? (
        <CommandList>
          <CommandEmpty>No Chats found.</CommandEmpty>
          <CommandGroup heading="Chats" className="child:cursor-pointer">
            {chats.map((chat) => (
              <CommandItem key={Math.random() * 12.3}>{chat}</CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default SearchChat;
