/** @format */
import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const montserrat = Montserrat({ subsets: ["latin"], weight: "800" });

const Navbar = () => {
  return (
    <div className="flex w-screen items-center justify-center h-12 gap-3">
      <Link href="/chat" className="link">
        Chat
      </Link>
      <Link href={"/login"} className="link">
        Login
      </Link>
    </div>
  );
};

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:px-5 px-2 items-center justify-center h-screen mb-10  text-center">
        <div
          className={`${montserrat.className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`}
        >
          <h1>
            A Chat Application built using{" "}
            <span
              className="bg-clip-text text-transparent
  bg-gradient-to-r from-purple-400 to-gray-800 dark:from-purple-300 dark:to-gray-600"
            >
              Next.js 13,
            </span>{" "}
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
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
          <Button variant="outline" className="flex gap-1">
            <GitHubLogoIcon />
            Github
          </Button>
        </div>
        <p className="text-muted-foreground">
          A Next.js 13 Chat app built with Modern technologies{" "}
        </p>
      </div>
    </>
  );
};

export default Page;
