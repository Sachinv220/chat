/** @format */

import { prisma } from "@/lib/db";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const getSchema = z.object({
  email: z.string(),
});

const postSchema = z.object({
  name: z.string(),
  users: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const checkSchema = postSchema.safeParse(body);

  if (!checkSchema.success) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
  const data = checkSchema.data;

  console.log(data);

  const res = await prisma.chat.create({
    data: {
      name: data.name,
      participants: {
        connect: data.users.map((email) => ({ email })),
      },
    },
  });
  
  return NextResponse.json({ message: "Success" }, { status: 200 });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const data = new URLSearchParams(url.search);
  const domain = data.get("domain");
  const user = data.get("email");

  if (!user || !domain) {
    return NextResponse.json({ message: "Invalid Request" }, { status: 300 });
  }

  const email = user + "@" + domain;

  const res = await prisma.chat.findMany({
    select: {
      id: true,
      name: true,
      participants: {
        select: {
          name: true,
          email: true,
          id: true,
        },
      },
    },
    where: {
      participants: {
        some: {
          email,
        },
      },
    },
  });

  return NextResponse.json(res);
}
