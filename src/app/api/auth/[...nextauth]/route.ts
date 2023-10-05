import { authOptions } from "@/lib/nextauth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export const config = {
    runtime: 'edge',
};
  
export { handler as GET, handler as POST };
