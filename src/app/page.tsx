/** @format */

import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { FcSearch } from "react-icons/fc";

export default async function Home() {
  const session = await getAuthSession();
  if (session === null) return redirect("/signin");
  const user = session.user;
  return (
    <main className="flex">
      <Sidebar
        name={user.name || undefined}
        email={user.email || undefined}
        image={user.image || undefined}
      />
      <div className="m-auto">
        <h1 className="text-xl font-serif">
          It is lonely in here, find someone to chat 
        </h1>
      </div>
    </main>
  );
}
