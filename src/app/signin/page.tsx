import SigninButton from "@/components/SigninButton";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getAuthSession();
  if (session?.user) redirect("/")
  return (
    <div className="grid place-items-center h-screen">
      <SigninButton/>
    </div>
  );
};

export default SignIn;
