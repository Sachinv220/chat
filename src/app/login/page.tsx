/** @format */

import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/nextauth";
import Image from "next/image";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect("/chat");
  
  return (
    <section className="flex flex-col items-center h-screen">
      <div className="flex justify-center items-center">
        <Image src="/favicon.webp" alt="logo" width={100} height={100} />
        <h1 className="text-4xl font-extrabold">Welcome to Chat Coffee!</h1>
      </div>
      <h2 className="grid mb-2 place-items-center text-muted-foreground">
        Crafted with ❤️ by Sachin.V
      </h2>
      <SignInButton className="mt-[20%]" />
    </section>
  );
};

export default SignIn;
