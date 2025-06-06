import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { banner } = body;

    if (!banner) {
      return new Response(JSON.stringify({ error: "Banner URL is required" }), {
        status: 400,
      });
    }

    // 更新 main_page 表中的 banner 字段
    const updatedMainPage = await prisma.main_page.update({
      where: {
        id: 1, // 假设你只有一条记录，或根据实际逻辑修改
      },
      data: {
        banner,
      },
    });

    return new Response(JSON.stringify({ data: updatedMainPage }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update main page data" }), {
      status: 500,
    });
  }
}
