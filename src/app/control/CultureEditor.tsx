'use client'

import { useState } from 'react'
import { Box, Heading, Flex, Text, Textarea, Button } from '@chakra-ui/react'
import type { CulturePrisma } from '@/type';

interface Props {
  data: CulturePrisma | null;
}

export default function CultureEditor(props: Props) {
  const [enData, setEnData] = useState(props.data?.data.en)
  const [zhData, setZhData] = useState(props.data?.data.zh)

  const handleSubmit = async () => {
    const res = await fetch('/api/culture/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { en: enData, zh: zhData } }),
    })

    if (res.ok) {
      alert('文化页内容更新成功')
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>文化页编辑</Heading>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">文化内容</Text>
          <Textarea value={zhData} onChange={(e) => setZhData(e.target.value)} placeholder="输入文化内容" />
          <Text fontWeight="bold">文化内容 英文版</Text>
          <Textarea value={enData} onChange={(e) => setEnData(e.target.value)} placeholder="输入文化内容" />
        </Flex>
        <Button colorScheme="blue" alignSelf="start" onClick={handleSubmit}>保存</Button>
      </Flex>
    </Box>
  )
}
