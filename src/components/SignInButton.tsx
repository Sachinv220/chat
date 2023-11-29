/** @format */

"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { cn } from "@/lib/utils";

const SignInButton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Button
      onClick={() => signIn("google").catch(console.error)}
      className={cn("gap-1 font-bold", className)}
      variant="outline"
    >
      Login With
      <FcGoogle />
    </Button>
  );
};

export default SignInButton;
