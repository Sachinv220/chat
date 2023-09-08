/** @format */
import Sidebar from "@/components/Sidebar";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session === null) return redirect("/signin")
  const user = session.user
  return (
    <main className="flex">
      <Sidebar
        name={user.name ? user.name : undefined}
        email={user.email ? user.email : undefined}
        image={user.image ? user.image : undefined}
      />
      <div className="ml-64">sdfjbnasklfnbjksdnfklasdnfklasnfk</div>
    </main>
  );
}
