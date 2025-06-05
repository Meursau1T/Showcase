import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/"; // 确保正确导入 prisma

export async function GET(request: NextRequest) {
  try {
    // 从URL参数中获取 name 和 password
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const password = searchParams.get("password");

    // 检查参数是否存在
    if (!name || !password) {
      return new NextResponse(
        JSON.stringify({ error: "Missing name or password" }),
        {
          status: 400,
        }
      );
    }

    // 使用 Prisma 查询数据库中的用户
    const user = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });

    // 如果用户不存在或密码不匹配
    if (!user || user.password !== password) {
      return new NextResponse(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    // 登录成功
    return new NextResponse(JSON.stringify({ message: "Login successful", user }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // 处理错误
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
