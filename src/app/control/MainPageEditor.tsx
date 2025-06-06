'use client'

import { useState } from 'react'

export default function MainPageEditor() {
  const [banner, setBanner] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/main_page/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ banner }),
    })

    if (res.ok) {
      alert('首页 Banner 更新成功')
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>首页编辑 - Banner</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel fontWeight="bold">Banner 地址</FormLabel>
          <Input value={banner} onChange={(e) => setBanner(e.target.value)} placeholder="输入 Banner 地址" />
        </FormControl>
        <Button colorScheme="blue" alignSelf="start" onClick={handleSubmit}>保存</Button>
      </Stack>
    </Box>
  )
}
