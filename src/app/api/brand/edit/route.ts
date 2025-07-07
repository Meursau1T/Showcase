import { NextRequest } from 'next/server'
import { prisma } from '@/utils'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { id, data } = body

        if (!data) {
            return new Response(JSON.stringify({ error: 'Missing data' }), {
                status: 400,
            })
        }

        const result = await prisma.brand.upsert({
            where: { id: id ? Number(id) : -1 },
            update: { data },
            create: { data },
        })

        return new Response(JSON.stringify({ data: result }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Error editing brand:', error)
        return new Response(JSON.stringify({ error: 'Failed to edit brand' }), {
            status: 500,
        })
    }
}
