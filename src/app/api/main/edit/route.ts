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

        // 更新 main_page 表中的 banner 和 products 字段
        const updatedMainPage = await prisma.main_page.update({
            where: { banner: current },
            data: {
                banner,
                products: products, // 假设 products 存储为 JSON 字符串
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
