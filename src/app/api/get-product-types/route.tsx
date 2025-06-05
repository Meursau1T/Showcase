import { prisma } from '@/utils';

// Server Component: 获取所有产品类型（中英文）
export async function GET() {
  try {
    // 从 category 表中获取 types 和 types_en 字段
    const categories = await prisma.category.findMany({
      select: {
        types: true,
        types_en: true,
      },
    });

    // 合并并去重中英文类型数组
    const allTypesZh = [
      ...new Set(categories.flatMap((cat) => cat.types || [])),
    ];
    const allTypesEn = [
      ...new Set(categories.flatMap((cat) => cat.types_en || [])),
    ];

    // 返回结果
    return new Response(
      JSON.stringify({
        types: allTypesZh,
        types_en: allTypesEn,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching product types:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch product types' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
