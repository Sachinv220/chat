"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";

interface Props {
  text: string;
}

const SigninButton: FC<Props> = ({ text }) => {
  return (
    <Button onClick={() => signIn("google").catch(console.error)} className="gap-1">
      {text}
      <FcGoogle />
    </Button>
  );
};

export default SigninButton;
