/** @format */

import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getAuthSession();
  if (!session) redirect("/");
  return (
    <div className="flex">
      <Sidebar user={session.user} />
      <div className="w-full">
        <h1 className="flex items-center justify-center min-h-full text-xl font-serif">
          It is lonely in here, find someone to chat
        </h1>
      </div>
    </div>
  );
}
