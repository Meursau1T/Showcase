import { NextRequest } from 'next/server'
import { prisma } from '@/utils'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { data } = body
        const { id } = data

        if (!data) {
            return new Response(JSON.stringify({ error: 'Missing data' }), {
                status: 400,
            })
        }

        let result
        if (id) {
            result = await prisma.product.upsert({
                where: { id: id },
                update: {
                    ...data,
                },
                create: {
                    ...data,
                    id: Number(id),
                },
            })
        } else {
            result = await prisma.product.create({
                data: {
                    ...data,
                },
            })
        }

        return new Response(JSON.stringify({ data: result }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Error editing product:', error)
        return new Response(JSON.stringify({ error: 'Failed to edit product' }), {
            status: 500,
        })
    }
}
