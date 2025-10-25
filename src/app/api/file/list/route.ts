import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public')

export async function GET() {
    try {
        // 确保目录存在
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
            return NextResponse.json([])
        }

        // 读取目录中的文件
        const files = fs.readdirSync(uploadDir).map((filename) => {
            const filePath = path.join(uploadDir, filename)
            const stats = fs.statSync(filePath)

            return {
                name: filename,
                size: stats.size,
                created: stats.birthtime,
            }
        })

        return NextResponse.json(files)
    } catch (error) {
        console.error('List files error:', error)
        return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
    }
}
