/** @format */

import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

const getChats = async (email: string) => {
  const data = await fetch(
    `${process.env.NEXTAUTH_URL}/api/chat?email=${email}`,
    { cache: "force-cache" }
  );
  const res = await data.json();
  return res as Chat[];
};

export default async function Home() {
  const session = await getAuthSession();
  if (session === null) return redirect("/signin");
  const user = session.user;
  const chats = await getChats(user.email || "");

  return (
    <main className="flex">
      <Sidebar chats={chats} user={user} />
      <div className="m-auto">
        <h1 className="text-xl font-serif">
          It is lonely in here, find someone to chat
        </h1>
      </div>
    </main>
  );
}
