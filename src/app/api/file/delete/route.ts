// pages/api/files/delete.ts
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { filename } = req.query

    if (!filename || typeof filename !== 'string') {
        return res.status(400).json({ error: 'Filename is required' })
    }

    // 防止路径遍历攻击
    const safePath = path.join(uploadDir, path.basename(filename))

    if (!safePath.startsWith(uploadDir)) {
        return res.status(403).json({ error: 'Invalid filename' })
    }

    try {
        if (!fs.existsSync(safePath)) {
            return res.status(404).json({ error: 'File not found' })
        }

        fs.unlinkSync(safePath)
        res.status(200).json({ success: true })
    } catch (error) {
        console.error('Delete error:', error)
        res.status(500).json({ error: 'Failed to delete file' })
    }
}
