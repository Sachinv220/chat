/** @format */
import React from "react";
import { Montserrat } from "next/font/google";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/components/Logo";

const montserrat = Montserrat({ subsets: ["latin"], weight: "800" });

const Navbar = () => {
  return (
    <div className="flex w-screen items-center h-12 pt-1">
      <Logo />
      <div className="child:link">
        <a href="/chat">
          <Button className="text-lg" variant="link">
            Chat
          </Button>
        </a>
        <a href="/login">
          <Button variant="link" className="text-lg">
            Link
          </Button>
        </a>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:px-5 px-2 items-center justify-center h-[90vh] text-center">
        <div
          className={`${montserrat.className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`}
        >
          <h1>
            A Chat Application built using Next.js 13,{" "}
            <span
              className="bg-clip-text text-transparent
  bg-gradient-to-r from-cyan-600 to-teal-500 dark:from-cyan-400 dark:to-teal-400"
            >
              Prisma
            </span>{" "}
            and next-auth
          </h1>
        </div>
        <div className="flex p-5 gap-5">
          <a href="/chat">
            <Button>Get Started</Button>
          </a>
          <a href="https://github.com/Sachinv220/chat">
            <Button variant="outline" className="flex gap-1">
              <GitHubLogoIcon />
              Github
            </Button>
          </a>
        </div>
        <p className="text-muted-foreground">
          A Next.js 13 Chat app built with Modern technologies{" "}
        </p>
      </div>
    </>
  );
};

export default Page;
