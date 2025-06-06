'use client'

import { useState } from 'react'
import { Box, Heading, Flex, Text, Input, Button } from '@chakra-ui/react'
import { CategoryPrisma } from '@/type'

interface Props {
  data: CategoryPrisma | null;
}

export default function CategoryEditor(props: Props) {
  const [types, setTypes] = useState(props.data?.types || [])
  const [typesEn, setTypesEn] = useState(props.data?.types_en || [])

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
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>分类编辑</Heading>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">中文分类</Text>
          <Input value={types} onChange={(e) => setTypes(e.target.value)} placeholder="中文分类" />
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">英文分类</Text>
          <Input value={typesEn} onChange={(e) => setTypesEn(e.target.value)} placeholder="英文分类" />
        </Flex>
        <Button colorScheme="blue" alignSelf="start" onClick={handleSubmit}>保存</Button>
      </Flex>
    </Box>
  )
}
