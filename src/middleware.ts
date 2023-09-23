/** @format */

import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  if (req.url.includes("/")) {
    return NextResponse.redirect(`http:localhost:3000/chat`);
  }
}

export const config = {
  matcher: "/",
};
