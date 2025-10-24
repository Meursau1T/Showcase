import type { Metadata } from 'next'
import type { RootLayoutParam } from '@/type'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import { Box } from '@chakra-ui/react'
import { Provider } from '@/components/ui/provider'
import './globals.css'
import { Header, Footer } from '@/components/ui/'
import { getSession } from '@/utils'

type Lang = 'en' | 'zh'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: '钰铭滤清器',
    description: '东莞市钰铭滤清器制品有限公司',
}

export default async function RootLayout({ children }: RootLayoutParam) {
    const locale = (await cookies()).get('lang')?.value || 'en'
    const session = await getSession(cookies)
    const isLogin = session.isLoggedIn || false

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Provider>
                    <Header locale={locale as Lang} isLogin={isLogin} />
                    <Box as="main" pt="60px" className="min-h-screen">
                        {children}
                    </Box>
                    <Footer locale={locale as Lang} />
                </Provider>
            </body>
        </html>
    )
}
