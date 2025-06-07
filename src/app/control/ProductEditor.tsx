'use client'

import { useState } from 'react'
import { Box, Heading, Flex, Text, Input, Button } from '@chakra-ui/react'
import { ProductPrisma } from '@/type'

interface Props {
  data: ProductPrisma[] | null;
}

export default function ProductEditor({ data: serverData }: Props) {
  const [data, setData] = useState({ name: '', price: '', desc: '' })

  const handleSubmit = async () => {
    const res = await fetch('/api/product/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    })

    if (res.ok) {
      alert('商品信息更新成功')
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>商品编辑</Heading>
      <Flex direction="column" gap={4}>
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
