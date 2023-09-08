/** @format */

"use client";
import { User } from "@prisma/client";
import { Input } from "./ui/input";
import UserNav from "./UserNav";
import { FC } from "react";

interface Props {
  name?: string;
  email?: string;
  image?: string,
}

const Sidebar: FC<Props> = ({ name, email, image }) => {
  return (
    <nav className="flex flex-col w-3/12 h-screen bg-slate-100 px-1 shadow-md">
      <section className="flex w-full gap-1 h-20 shadow-sm">
        <Input
          type="text"
          placeholder="chat with a friend"
          className="bg-white mt-5 w-full shadow-md"
        />
        <UserNav image={image} name={name} email={email} />
      </section>
    </nav>
  );
};

export default Sidebar;
