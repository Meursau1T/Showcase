import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        optimizePackageImports: ['@chakra-ui/react'],
    },
    typescript: {
        ignoreBuildErrors: true, // 让 next build 在有 TS 错误时仍继续产物输出
    },
    eslint: {
        ignoreDuringBuilds: true, // 如果你也不想因为 ESLint 报错而失败
    },
}

export default nextConfig
