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
    return NextResponse.json({ error: "Invalid input" }, { status: 300 });
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
}

export async function GET(req: NextRequest) {
  const res = await req.json();
  const check = getSchema.safeParse(res);

  if (!check.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 300 });
  }
  const body = check.data;

  const data = await prisma.chat.findMany({
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
        every: {
          id: body.email,
        },
      },
    },
  });

  return NextResponse.json(data);
}
