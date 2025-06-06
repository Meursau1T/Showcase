'use client'

import { useState } from 'react'
import { Box, Heading, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

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
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">Banner 地址</Text>
          <Input value={banner} onChange={(e) => setBanner(e.target.value)} placeholder="输入 Banner 地址" />
        </Flex>
        <Button colorScheme="blue" alignSelf="start" onClick={handleSubmit}>保存</Button>
      </Flex>
    </Box>
  )
}
