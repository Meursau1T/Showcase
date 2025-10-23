import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const filename = searchParams.get('filename')

        if (!filename) {
            return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
        }

        const filePath = path.join(uploadDir, filename)

        // 检查文件是否存在
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 })
        }

        // 删除文件
        fs.unlinkSync(filePath)

        return NextResponse.json({
            success: true,
            message: 'File deleted successfully',
        })
    } catch (error) {
        console.error('Delete error:', error)
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
    }
}
