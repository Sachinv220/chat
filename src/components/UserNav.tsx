/** @format */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

interface Props {
  email?: string;
  name?: string;
  image?: string;
}

const UserNav: FC<Props> = ({ name, email, image }) => {
  const parts = name?.split(" ");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage className="mb-4" src={image} />
          <AvatarFallback>
            {parts ? parts[0][0] + parts[1][0] : "sdaf"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="cursor-pointer">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuItem>{email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut().catch(console.error)} className="text-red-500">
          Log out &nbsp; <ExitIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
