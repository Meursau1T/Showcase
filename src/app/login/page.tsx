import { PageParam } from '@/type'
import LoginPage from './index'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSession } from '@/utils'

export default async function Page({ searchParams }: PageParam) {
    const lang = ((await cookies()).get('lang')?.value || 'en') as 'zh' | 'en'
    const session = await getSession(cookies)

    if (session.isLoggedIn) {
        redirect('/control')
    }

    return <LoginPage lang={lang} />
}
