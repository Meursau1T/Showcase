import { NextRequest, NextResponse } from 'next/server'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public')

export async function POST(request: NextRequest) {
    try {
        // 确保上传目录存在
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        // 获取表单数据
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        // 获取文件信息
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // 创建安全的文件名
        const originalName = file.name
        const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_') // 简单的文件名清理
        const filePath = path.join(uploadDir, safeName)

        // 检查文件是否已存在
        if (fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'File already exists' }, { status: 409 })
        }

        // 写入文件
        fs.writeFileSync(filePath, buffer)

        return NextResponse.json({
            success: true,
            filename: safeName,
            message: 'File uploaded successfully',
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
}
