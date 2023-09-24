/** @format */

import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  if (req.url.includes("/")) {
    return NextResponse.redirect(`https://chatcoffee.netlify.app/chat`);
  }
}

export const config = {
  matcher: "/",
};
