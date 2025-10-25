// app/api/uploads/[filename]/route.ts
import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'uploads') // 注意：不是 public/uploads

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
    const { filename } = params
    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filePath = path.join(uploadDir, safeFilename)

    if (!fs.existsSync(filePath)) {
        return new Response('File not found', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)
    const contentType = getContentType(safeFilename)

    return new Response(fileBuffer, {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000', // 可选缓存
        },
    })
}

function getContentType(filename: string): string {
    const ext = path.extname(filename).toLowerCase()
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg'
        case '.png':
            return 'image/png'
        case '.gif':
            return 'image/gif'
        case '.webp':
            return 'image/webp'
        default:
            return 'application/octet-stream'
    }
}
