/** @format */

import SearchChat from "@/components/SearchChat";
import UserNav from "@/components/UserNav";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getAuthSession();
  if (session === null) return redirect("/signin");
  const user = session.user;

  return (
    <main className="flex">
      <nav className="flex flex-col w-4/12 h-screen shadow-md border-r-2">
        <form className="flex w-full gap-1 shadow-sm">
          <SearchChat chats={["sachin", "rithik"]} />
          <Button className="bg-transparent m-0 mx-1 p-0 w-10 rounded-full my-1">
            <PlusIcon color="white" />
          </Button>
        </form>
        <div className="mt-auto m-3">
          <UserNav
            image={user.image || undefined}
            name={user.name || undefined}
            email={user.email || undefined}
          />
        </div>
      </nav>
      <div className="m-auto">
        <h1 className="text-xl font-serif">
          It is lonely in here, find someone to chat
        </h1>
      </div>
    </main>
  );
}
