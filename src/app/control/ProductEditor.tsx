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
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>商品编辑（除ID外）</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel fontWeight="bold">商品 ID</FormLabel>
          <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="商品 ID" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">名称</FormLabel>
          <Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="名称" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">价格</FormLabel>
          <Input value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} placeholder="价格" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">描述</FormLabel>
          <Input value={data.desc} onChange={(e) => setData({ ...data, desc: e.target.value })} placeholder="描述" />
        </FormControl>
        <Button colorScheme="blue" alignSelf="start" onClick={handleSubmit}>保存</Button>
      </Stack>
    </Box>
  )
}
