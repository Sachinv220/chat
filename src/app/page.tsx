/** @format */

import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: "800" });

const Navbar = () => {
  const className =
    "flex text-lg dark:text-white text-black text-opacity-50 hover:text-opacity-100";
  return (
    <div className="flex w-screen items-center justify-center h-12 gap-3">
      <Link href="/chat" className={className}>
        Chat
      </Link>
      <Link href={"/login"} className={className}>
        Login
      </Link>
    </div>
  );
};

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-20">
        <div className="text-center px-10 mb-20">
          <h1
            className={`${montserrat.className} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`}
          >
            A Chat Application built using Next.js 13, Prisma and next-auth.
          </h1>
          <p className="text-black dark:text-white text-opacity-50">
            The Source code is available on{" "}
            <Link
              href="https://github.com/Sachinv220/chat"
              className="underline hover:text-blue-500"
            >
              Github
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
