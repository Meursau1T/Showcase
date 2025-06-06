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
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>文化页编辑</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel fontWeight="bold">文化内容</FormLabel>
          <Textarea value={data} onChange={(e) => setData(e.target.value)} placeholder="输入文化内容" />
        </FormControl>
        <Button colorScheme="blue" alignSelf="start" onClick={handleSubmit}>保存</Button>
      </Stack>
    </Box>
  )
}
