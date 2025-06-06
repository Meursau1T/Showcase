import { NextRequest } from "next/server";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { getSession } from "@/utils";

const createIfNoUser = async (name: string, password: string) => {
  const firstUser = await prisma.user.findFirst();

  if (!firstUser) {
    const info = {
      name,
      password,
    }
    await prisma.user.create({
      data: info,
    });
    return info;
  } else {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const password = searchParams.get("password");

  if (!name || !password) {
    return new Response(JSON.stringify({ error: "Missing name or password" }), {
      status: 400,
    });
  }

  // 若没有用户，就根据账号密码新建一个，返回新建的用户；如果有，就从数据库里取
  const user = await createIfNoUser(name, password) || await prisma.user.findUnique({
    where: { name },
  });

  if (!user || user.password !== password) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  const session = await getSession(cookies);

  // 设置登录状态
  session.isLoggedIn = true;
  session.user = {
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
