'use client'

import { useState } from 'react'
import { Box, Heading, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

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
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>分类编辑</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel fontWeight="bold">中文分类</FormLabel>
          <Input value={types} onChange={(e) => setTypes(e.target.value)} placeholder="中文分类" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="bold">英文分类</FormLabel>
          <Input value={typesEn} onChange={(e) => setTypesEn(e.target.value)} placeholder="英文分类" />
        </FormControl>
        <Button colorScheme="blue" alignSelf="start" onClick={handleSubmit}>保存</Button>
      </Stack>
    </Box>
  )
}
