import { NextRequest } from 'next/server';
import { prisma } from '@/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body;

    if (!data) {
      return new Response(JSON.stringify({ error: 'Missing data' }), {
        status: 400,
      });
    }

    const result = await prisma.culture.upsert({
      where: { id: 1 },
      update: { data },
      create: { data },
    });

    return new Response(JSON.stringify({ data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error editing culture:', error);
    return new Response(JSON.stringify({ error: 'Failed to edit culture' }), {
      status: 500,
    });
  }
}
