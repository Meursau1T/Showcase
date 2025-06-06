import { NextRequest } from "next/server";
import { prisma } from "@/utils/prisma";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/sessionOptions";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const password = searchParams.get("password");

  if (!name || !password) {
    return new Response(JSON.stringify({ error: "Missing name or password" }), {
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: { name },
  });

  if (!user || user.password !== password) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const session = await getIronSession(request, request, sessionOptions);

  // 设置登录状态
  session.isLoggedIn = true;
  session.user = {
    id: user.id,
    name: user.name,
  };

  await session.save();

  return new Response(JSON.stringify({ message: "Login successful" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
