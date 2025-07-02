import { NextRequest } from 'next/server';
import { prisma } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id' }), {
        status: 400,
      });
    }
    
    const result = await prisma.product.delete({
      where: { id: id ? Number(id) : -1 },
    })
  
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
