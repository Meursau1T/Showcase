import { NextRequest } from "next/server";
import { prisma } from "@/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { types, types_en } = body;

    if (!Array.isArray(types) || !Array.isArray(types_en)) {
      return new Response(JSON.stringify({ error: "types and types_en must be arrays" }), {
        status: 400,
      });
    }

    // 更新 category 表中的 types 和 types_en 字段
    const updatedCategory = await prisma.category.update({
      where: {
        id: 1, // 假设你只有一条记录，或根据实际逻辑修改
      },
      data: {
        types: types, // 假设字段是字符串类型，用逗号拼接
        types_en: types_en,
      },
    });

    return new Response(JSON.stringify({ data: updatedCategory }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update category data" }), {
      status: 500,
    });
  }
}
