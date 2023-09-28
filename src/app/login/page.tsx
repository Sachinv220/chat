import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect("/chat")
  return (
    <div className="grid place-items-center h-screen">
      <SignInButton/>
    </div>
  );
};

export default SignIn;
