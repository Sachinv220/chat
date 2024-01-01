/** @format */
"use client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/ToggleTheme";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { ReactNode, useEffect, useState } from "react";
import {
  NextAuthIcon,
  NextIcon,
  ReactIcon,
  TailwindIcon,
} from "@/components/Icons";
import Image from "next/image";
import { useTheme } from "next-themes";

const features: Array<CardProps> = [
  {
    image: NextIcon,
    title: "Nextjs.14",
    content: "App dir, Routing, Layouts, Loading UI and Server functions",
  },
  {
    image: TailwindIcon,
    title: "Tailwind CSS",
    content: "Shadcn UI Components styled with Tailwind CSS.",
  },
  {
    image: NextAuthIcon,
    title: "Authentication",
    content: "Authentication using NextAuth.js and middlewares",
  },
  {
    image: ReactIcon,
    title: "React",
    content: "Server and Client Components. Use hook.",
  },
];

const Navbar = () => {
  return (
    <div className="flex w-screen items-center h-12 pt-4">
      <Logo />
      <div className="child:link">
        <a href="/chat">
          <Button className="text-lg" variant="link">
            Chat
          </Button>
        </a>
        <a href="/login">
          <Button variant="link" className="text-lg">
            Login
          </Button>
        </a>
      </div>
      <ToggleTheme variant="secondary" className="ml-auto mr-3" />
    </div>
  );
};

const Page = () => {
  return (
    <div className="max-h-screen">
      <Navbar />
      <div className="flex flex-col lg:px-5 px-2 items-center justify-center h-[70vh] text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Chat Coffee
        </h1>
        <p className="text-muted-foreground text-sm">
          A real time chat application built with Modern technologies{" "}
        </p>
        <div className="flex p-5 gap-5">
          <a href="/chat">
            <Button>Get Started</Button>
          </a>
          <a href="https://github.com/Sachinv220/chat">
            <Button variant="secondary" className="flex gap-1">
              Github
              <GitHubLogoIcon />
            </Button>
          </a>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-extrabold scroll-m-20 pb-2 tracking-tight text-center">
          Features
        </h1>
        <div className="features px-1">
          {features.map((ft, index) => (
            <SimpleCard
              key={index}
              image={ft.image}
              title={ft.title}
              content={ft.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  image: ReactNode;
  title?: string;
  content?: string;
}

const SimpleCard: React.FC<CardProps> = ({ image, title, content }) => {
  return (
    <Card className="bg-slate-100 dark:bg-slate-900 m-3 w-30">
      <CardHeader>{image}</CardHeader>
      <CardContent>
        <h1 className="font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
};

function Logo() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="w-[100px] h-[100px]"></span>;
  }
  let src;

  switch (resolvedTheme) {
    case "dark":
      src = "/icon.png";
      break;
    case "light":
      src = "/dark-icon.png";
      break;
    default:
      src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      break;
  }

  return <Image src={src} alt="Logo" className="mt-1" width={100} height={100} />;
}

export default Page;
