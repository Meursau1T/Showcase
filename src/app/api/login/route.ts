import { NextRequest } from 'next/server'
import { prisma } from '@/utils/prisma'
import { cookies } from 'next/headers'
import { getSession } from '@/utils'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const name = searchParams.get('name')
    const password = searchParams.get('password')

    if (!name || !password) {
        return new Response(JSON.stringify({ error: 'Missing name or password' }), {
            status: 400,
        })
    }

    // 检查是否是第一个用户（数据库中没有任何用户）
    const userCount = await prisma.user.count()
    if (userCount === 0) {
        // 创建第一个用户
        const newUser = await prisma.user.create({
            data: {
                name,
                password,
            },
        })

        const session = await getSession(cookies())
        session.isLoggedIn = true
        session.user = {
            name: newUser.name,
        }
        await session.save()

        return new Response(JSON.stringify({ message: 'First user created and logged in' }), {
            status: 201, // Created
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    const user = await prisma.user.findUnique({
        where: { name },
    })

    if (!user || user.password !== password) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
            status: 401,
        })
    }

    const session = await getSession(cookies)

    // 设置登录状态
    session.isLoggedIn = true
    session.user = {
        name: user.name,
    }

    await session.save()

    return new Response(JSON.stringify({ message: 'Login successful' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
