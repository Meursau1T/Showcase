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
    async headers() {
        const extensions = [
            'png',
            'jpg',
            'jpeg',
            'gif',
            'webp',
            'svg',
            'ico',
            'mp4',
            'webm',
            'ogg',
            'mp3',
            'wav',
            'woff',
            'woff2',
            'ttf',
            'eot',
        ]

        return extensions.map((ext) => ({
            source: `/:path*.${ext}`, // 匹配任意路径以 .ext 结尾
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public, max-age=31536000' + (ext !== 'svg' ? ', immutable' : ''),
                },
            ],
        }))
    },
}

export default nextConfig
