/** @format */
"use client";
import React from "react";
import Album from "./Album";
import { useChatData } from "./data-provider";
import { usePathname } from "next/navigation";
import { getChatName, getImages } from "@/lib/utils";
import { HamburgerMenuIcon, ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  userId: string;
}

const Navbar: React.FC<Props> = ({ userId }) => {
  const id = usePathname().split("/").at(2);
  const { chats } = useChatData();
  const currentChat = chats.filter((chat) => chat.id === id).at(0);
  return (
    <React.Fragment>
      <div className="fixed top-0 px-2 pt-1 flex flex-col w-full h-16 bg-slate-200 dark:bg-slate-900 z-10">
        <div className="flex w-full gap-1 pb-3">
          <Album
            images={getImages(currentChat || null, userId)}
            className="mb-1 w-12 h-12"
          />
          <div className="flex flex-col">
            <h3 className="scroll-m-20 text-lg font-medium tracking-tight">
              {getChatName(currentChat || null, userId)}
            </h3>
            <p className="text-muted-foreground text-sm">
              {DisplayParticipants()}
            </p>
          </div>
          <div className="fixed top-4 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <HamburgerMenuIcon width={20} height={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="child-hover:cursor-pointer">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Add User</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                  Leave &nbsp; <ExitIcon />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="h-12"></div>
    </React.Fragment>
  );

  function DisplayParticipants(): React.ReactNode {
    return currentChat?.participants.map((p, index) => {
      return (
        p.name + (index !== currentChat.participants.length - 1 ? ", " : "")
      );
    });
  }
};

export default Navbar;
