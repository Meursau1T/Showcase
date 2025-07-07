import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getSession } from '@/utils'

export async function GET(request: NextRequest) {
    const session = await getSession(cookies)

    if (!session.isLoggedIn) {
        return new Response(JSON.stringify({ isLoggedIn: false }), { status: 401 })
    }

    return new Response(JSON.stringify({ isLoggedIn: true, user: session.user }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
