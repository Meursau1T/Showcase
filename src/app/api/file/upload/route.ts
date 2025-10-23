// pages/api/files/upload.ts
import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

export const config = {
    api: {
        bodyParser: false, // 禁用默认 body 解析
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        const form = new formidable.IncomingForm({
            uploadDir,
            keepExtensions: true,
            maxFileSize: 10 * 1024 * 1024, // 10MB 限制
        })

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'Upload failed' })
            }

            // formidable 默认会生成随机文件名，这里我们保留原始文件名（注意安全）
            const file = Array.isArray(files.file) ? files.file[0] : files.file
            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' })
            }

            const originalName = file.originalFilename || 'unknown'
            const safeName = Buffer.from(originalName, 'latin1').toString('utf8') // 防止编码问题
            const newPath = path.join(uploadDir, safeName)

            // 检查是否重名，可选：覆盖或重命名
            if (fs.existsSync(newPath)) {
                return res.status(409).json({ error: 'File already exists' })
            }

            fs.renameSync(file.filepath, newPath)
            res.status(200).json({ success: true, filename: safeName })
        })
    } catch (error) {
        console.error('Upload error:', error)
        res.status(500).json({ error: 'Upload failed' })
    }
}
