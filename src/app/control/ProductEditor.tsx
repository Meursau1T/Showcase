'use client'

import { useState } from 'react'

export default function ProductEditor() {
  const [id, setId] = useState('')
  const [data, setData] = useState({ name: '', price: '', desc: '' })

  const handleSubmit = async () => {
    const res = await fetch('/api/product/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, data }),
    })

    if (res.ok) {
      alert('商品信息更新成功')
    }
  }

  return (
    <div>
      <h3>商品编辑（除ID外）</h3>
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="商品 ID" />
      <input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="名称" />
      <input value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} placeholder="价格" />
      <input value={data.desc} onChange={(e) => setData({ ...data, desc: e.target.value })} placeholder="描述" />
      <button onClick={handleSubmit}>保存</button>
    </div>
  )
}
