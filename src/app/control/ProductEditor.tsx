'use client'

import { useState } from 'react'
import { Box, Heading, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

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
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">商品 ID</Text>
          <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="商品 ID" />
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">名称</Text>
          <Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="名称" />
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">价格</Text>
          <Input value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} placeholder="价格" />
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">描述</Text>
          <Input value={data.desc} onChange={(e) => setData({ ...data, desc: e.target.value })} placeholder="描述" />
        </Flex>
        <Button colorScheme="blue" alignSelf="start" onClick={handleSubmit}>保存</Button>
      </Flex>
    </Box>
  )
}
