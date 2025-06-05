import { NextRequest } from 'next/server';
import { prisma } from '@/utils';

/**
 * 处理 GET 请求：获取 culture 表中的所有数据
 * 解析方式：await fetch('/api/products').then(res => res.json());
 */
export async function GET(request: NextRequest) {
  try {
    // 调用 Prisma 查询 culture 表所有项
    const cultures = await prisma.culture.findMany();

    // 返回成功响应
    return new Response(JSON.stringify({ data: cultures }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // 捕获异常并返回错误信息
    console.error('获取 culture 数据失败:', error);
    return new Response(
      JSON.stringify({ error: '获取 culture 数据失败' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
