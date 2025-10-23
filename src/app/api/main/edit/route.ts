import { NextRequest } from 'next/server'
import { prisma } from '@/utils'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { banner, products, current } = body

        if (!banner) {
            return new Response(JSON.stringify({ error: 'Banner URL is required' }), {
                status: 400,
            })
        }

        // 先删除旧的（如果 current 存在且不等于新 banner）
        if (current && current !== banner) {
            await prisma.main_page.delete({ where: { banner: current } }).catch(() => {})
        }

        // 然后 upsert 新的 banner
        const updatedMainPage = await prisma.main_page.upsert({
            where: { banner }, // 用新 banner 作为主键查找
            update: {
                products: products,
            },
            create: {
                banner,
                products: products,
            },
        })

        return new Response(JSON.stringify({ data: updatedMainPage }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update main page data' }), {
            status: 500,
        })
    }
}
