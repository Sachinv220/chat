/** @format */
"use client";
import React, { FC, useState } from "react";
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
  const [showChats, setShowChats] = useState(false);
  return (
    <Command className="max-lg">
      <div className="dark:bg-slate-900 bg-slate-200 ">
        <CommandInput
          onClick={(e) => setShowChats(true)}
          onKeyDown={(e) => (e.key === "Escape" ? setShowChats(false) : "")}
          placeholder="Search..."
        />
      </div>
      {showChats ? (
        <CommandList>
          <CommandEmpty>No Chats found.</CommandEmpty>
          <CommandGroup heading="Chats">
            {chats.map((chat, index) => (
              <CommandItem className="cursor-pointer" key={index}>
                {chat}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      ) : (
        ""
      )}
    </Command>
  );
};

export default SearchChat;
