"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

const SignInButton = () => {
  return (
    <Button
      onClick={() => signIn("google").catch(console.error)}
      className="gap-1 font-bold"
    >
      Login With
      <FcGoogle />
    </Button>
  );
};

export default SignInButton;