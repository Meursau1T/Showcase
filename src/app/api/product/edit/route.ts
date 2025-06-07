import { NextRequest } from 'next/server';
import { prisma } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, data } = body;

    if (!data) {
      return new Response(JSON.stringify({ error: 'Missing data' }), {
        status: 400,
      });
    }

    const result = 'TODO';
    // const result = await prisma.product.upsert({
    //   where: { id: id },
    //   update: { data },
    //   create: {
    //     id: Number(id),
    //     data,
    //   },
    // });

    return new Response(JSON.stringify({ data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error editing product:', error);
    return new Response(JSON.stringify({ error: 'Failed to edit product' }), {
      status: 500,
    });
  }
}
