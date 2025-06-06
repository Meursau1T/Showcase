'use client'

import { useState } from 'react'

export default function CategoryEditor() {
  const [types, setTypes] = useState('')
  const [typesEn, setTypesEn] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/category/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ types, types_en: typesEn }),
    })

    if (res.ok) {
      alert('分类更新成功')
    }
  }

  return (
    <div>
      <h3>分类编辑</h3>
      <input value={types} onChange={(e) => setTypes(e.target.value)} placeholder="中文分类" />
      <input value={typesEn} onChange={(e) => setTypesEn(e.target.value)} placeholder="英文分类" />
      <button onClick={handleSubmit}>保存</button>
    </div>
  )
}
