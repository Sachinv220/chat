/** @format */
"use client";
import React, { useEffect } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Logo, { DarkImage, ToggleTheme } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

const features: Array<{ image: string; title?: string; content?: string }> = [
  {
    image: "/next-icon.png",
    title: "Nextjs.14",
    content: "App dir, Routing, Layouts, Loading UI and Server functions",
  },
  {
    image: "/tailwind-icon.png",
    title: "Nextjs.14",
    content: "App dir, Routing, Layouts, Loading UI and Server functions",
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
      <ToggleTheme className="ml-auto mr-1" />
    </div>
  );
};

const Page = () => {
  return (
    <>
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
        <h1 className="text-4xl font-extrabold scroll-m-20 tracking-tight mb-5 text-center">
          Features
        </h1>
        <div className="grid grid-rows-3 grid-cols-3 gap-5 px-4">
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
    </>
  );
};

interface CardProps {
  image: string;
  title?: string;
  content?: string;
}

const SimpleCard: React.FC<CardProps> = ({ image, title, content }) => {
  return (
    <Card className="bg-slate-100 dark:bg-slate-900">
      <CardHeader className="flex flex-row gap-2 mb-0">
        <DarkImage src={image} alt="" width={50} height={50} />{" "}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        {content}
      </CardContent>
    </Card>
  );
};

export default Page;
