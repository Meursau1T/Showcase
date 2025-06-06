'use client'

import { useState } from 'react'

export default function CultureEditor() {
  const [data, setData] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/culture/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    })

    if (res.ok) {
      alert('文化页内容更新成功')
    }
  }

  return (
    <div>
      <h3>文化页编辑</h3>
      <textarea value={data} onChange={(e) => setData(e.target.value)} placeholder="输入文化内容" />
      <button onClick={handleSubmit}>保存</button>
    </div>
  )
}
