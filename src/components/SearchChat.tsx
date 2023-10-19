/** @format */
"use client";
import { useState, FC } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

interface Props {
  chats: Array<{
    id: string;
    name: string;
  }>;
}

const SearchChat: FC<Props> = ({ chats }) => {
  const [showChats, setShowChats] = useState(false);
  const router = useRouter();
  return (
    <Command className="max-lg">
      <div className="dark:bg-slate-900 bg-slate-100 ">
        <CommandInput
          onClick={(e) => setShowChats(true)}
          onKeyDown={(e) => (e.key === "Escape" ? setShowChats(false) : "")}
          placeholder="Search..."
        />
      </div>
      {showChats && (
        <CommandList>
          <CommandEmpty>No Chats found.</CommandEmpty>
          <CommandGroup heading="Chats">
            {chats.map((chat, index) => (
              <CommandItem
                onClickCapture={() => router.push(`/chat/${chat.id}`)}
                className="cursor-pointer"
                key={index}
              >
                {chat.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default SearchChat;
