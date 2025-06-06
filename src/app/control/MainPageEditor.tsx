'use client'

import { useState } from 'react'
import { Box, Heading, Flex, Text, Input, Button } from '@chakra-ui/react'
import type { MainPrisma } from '@/type'

interface Props {
  data: MainPrisma | null;
}

export default function MainPageEditor(props: Props) {
  const [banner, setBanner] = useState(props.data?.banner || '')
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleSubmit = async () => {
    const res = await fetch('/api/main/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ banner, current: props.data?.banner }),
    })

    if (res.ok) {
      setIsSuccess(true)
      setMessage('首页 Banner 更新成功')
    } else {
      setIsSuccess(false)
      const result = await res.json()
      setMessage(result.error || '更新失败')
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>首页编辑 - Banner</Heading>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">Banner 地址</Text>
          <Input
            value={banner}
            onChange={(e) => {
              setMessage(null);
              setBanner(e.target.value);
            }}
            placeholder="输入 Banner 地址"
          />
        </Flex>
        <Flex align="center" gap={3}>
          <Button colorScheme="blue" onClick={handleSubmit}>
            保存
          </Button>
          {message && (
            <Text color={isSuccess ? 'green.500' : 'red.500'} fontSize="sm">
              {message}
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
