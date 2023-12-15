/** @format */

import Logo from "@/components/Logo";
import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect("/chat");

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Card className="text-center">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Chat Coffee</CardTitle>
          <CardDescription>
            This is an indie-dev website developed by Sachin.V
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
