import { getAuthSession } from "@/lib/nextauth";
import Image from "next/image";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <nav className="flex w-full h-16 bg-slate-100 shadow-md items-center px-4 mb-3">
      <h1 className="font-bold text-3xl">Tellify</h1>
      &nbsp;
      {session?.user.image ? <Image src={session.user.image} width={35} height={35} alt="Your picture"/> :""}
    </nav>
  );
};

export default Navbar;
