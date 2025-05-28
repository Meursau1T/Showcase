import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. 从URL获取lang参数
  const langParam = request.nextUrl.searchParams.get('lang')
  
  // 2. 从cookie获取当前语言设置
  const langCookie = request.cookies.get('lang')?.value
  
  // 3. 优先使用URL参数，其次使用cookie，默认en
  const lang = langParam || langCookie || 'en'
  
  // 4. 如果URL中有新lang参数且与cookie不同，更新cookie
  const response = NextResponse.next()
  if (langParam && langParam !== langCookie) {
    response.cookies.set('lang', lang, {
      maxAge: 60 * 60 * 24 * 30, // 30天
      path: '/',
      sameSite: 'lax'
    })
  }
  
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
