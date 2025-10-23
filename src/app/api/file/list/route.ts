import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const publicDir = path.join(process.cwd(), 'public', 'uploads') // 建议将可管理文件放在 public/uploads 下

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        // 确保目录存在
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true })
        }

        const files = fs.readdirSync(publicDir).map((file) => {
            const stats = fs.statSync(path.join(publicDir, file))
            return {
                name: file,
                size: stats.size,
                modified: stats.mtime,
                url: `/uploads/${file}`, // 用于下载链接
            }
        })

        res.status(200).json(files)
    } catch (error) {
        console.error('Error listing files:', error)
        res.status(500).json({ error: 'Failed to list files' })
    }
}
