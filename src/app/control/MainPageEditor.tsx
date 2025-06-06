'use client'

import { useState } from 'react'

export default function MainPageEditor() {
  const [banner, setBanner] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/main_page/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ banner }),
    })

    if (res.ok) {
      alert('首页 Banner 更新成功')
    }
  }

  return (
    <div>
      <h3>首页编辑 - Banner</h3>
      <input value={banner} onChange={(e) => setBanner(e.target.value)} placeholder="输入 Banner 地址" />
      <button onClick={handleSubmit}>保存</button>
    </div>
  )
}
