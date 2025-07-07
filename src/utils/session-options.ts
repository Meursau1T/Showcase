import { SessionOptions, getIronSession } from 'iron-session'

export const sessionOptions: SessionOptions = {
    password: 'OGqw75o5Vz%^dBH^!#1@XfLHkiQfQqzz',
    cookieName: 'ymfilter_session',
    ttl: 60 * 60 * 24 * 1, // 7 天
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production', // 仅 HTTPS
        httpOnly: true,
        sameSite: 'lax',
    },
}

/** 获取Session，直接传next/header中的cookies */
export async function getSession(cookies: any) {
    const cookieStore = await cookies()
    const session = await getIronSession<SessionData>(cookieStore, sessionOptions)

    // 如果值不存在，给个默认值
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn
    }

    return session
}

export interface SessionData {
    user?: {
        name: string
    }
    isLoggedIn?: boolean
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
}
