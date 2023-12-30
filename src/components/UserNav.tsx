/** @format */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";
import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import ToggleTheme from "./ToggleTheme";

interface Props {
  user: Pick<Session["user"], "image" | "name" | "email">;
}

const UserNav: FC<Props> = ({ user }) => {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user.image ? (
            <Image alt="Profile" src={user.image} height={50} width={50} />
          ) : (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="child:cursor-pointer">
        <DropdownMenuItem className="flex flex-col">
          <h1 className="font-bold mr-auto">{user.name}</h1>
          <h2 className="opacity-60">{user.email}</h2>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleTheme}>
          Toggle Theme <ToggleTheme variant="ghost" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut().catch(console.error)}
          className="text-red-500"
        >
          Log out &nbsp; <ExitIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
