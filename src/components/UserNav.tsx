/** @format */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";
import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

interface Props {
  email?: string;
  name?: string;
  image?: string;
}

const UserNav: FC<Props> = ({ name, email, image }) => {
  const parts = name?.split(" ") as string[];
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
          <AvatarImage className="mb-4" src={image} />
          <AvatarFallback>
            {parts ? parts[0][0] + parts[1][0] : ""}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="cursor-pointer">

        <DropdownMenuItem className="flex flex-col">
          <h1 className="font-bold mr-auto">{name}</h1>
          <h2 className="opacity-60">{email}</h2>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleTheme}>
          Toggle theme &nbsp;
          {theme === "dark" ? <SunIcon className="font-bold" /> : <MoonIcon />}
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
