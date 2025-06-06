'use client'

import { useState } from 'react'
import { Box, Heading, Flex, Text, Textarea, Button } from '@chakra-ui/react'
import type { CulturePrisma } from '@/type';

interface Props {
  data: CulturePrisma | null;
}

const defaultVal = { imageContent: '', backgroundImage: '', textContent: '' }

export default function CultureEditor(props: Props) {
  const [enData, setEnData] = useState(props.data?.data.en || defaultVal)
  const [zhData, setZhData] = useState(props.data?.data.zh || defaultVal)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async () => {
    const res = await fetch('/api/culture/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { en: enData, zh: zhData } }),
    })

    if (res.ok) {
      setIsSuccess(true)
      setMessage('文化页内容更新成功')
    } else {
      setIsSuccess(false)
      const result = await res.json()
      setMessage(result.error || '更新失败')
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>文化页编辑</Heading>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={4}>
          {/* 中文内容 */}
          <Flex direction="column" gap={2}>
            <Text fontWeight="bold">中文 - 背景图片</Text>
            <Textarea
              value={zhData?.backgroundImage || ''}
              onChange={(e) =>
                setZhData({
                  ...zhData,
                  backgroundImage: e.target.value,
                })
              }
              placeholder="背景图片地址"
            />
          </Flex>
          <Flex direction="column" gap={2}>
            <Text fontWeight="bold">中文 - 文案内容</Text>
            <Textarea
              value={zhData?.textContent || ''}
              onChange={(e) =>
                setZhData({
                  ...zhData,
                  textContent: e.target.value,
                })
              }
              placeholder="输入中文文案"
            />
          </Flex>
          <Flex direction="column" gap={2}>
            <Text fontWeight="bold">中文 - 图片内容</Text>
            <Textarea
              value={zhData?.imageContent || ''}
              onChange={(e) =>
                setZhData({
                  ...zhData,
                  imageContent: e.target.value,
                })
              }
              placeholder="图片地址"
            />
          </Flex>

          {/* 英文内容 */}
          <Flex direction="column" gap={2}>
            <Text fontWeight="bold">英文 - 背景图片</Text>
            <Textarea
              value={enData?.backgroundImage || ''}
              onChange={(e) =>
                setEnData({
                  ...enData,
                  backgroundImage: e.target.value,
                })
              }
              placeholder="背景图片地址"
            />
          </Flex>
          <Flex direction="column" gap={2}>
            <Text fontWeight="bold">英文 - 文案内容</Text>
            <Textarea
              value={enData?.textContent || ''}
              onChange={(e) =>
                setEnData({
                  ...enData,
                  textContent: e.target.value,
                })
              }
              placeholder="输入英文文案"
            />
          </Flex>
          <Flex direction="column" gap={2}>
            <Text fontWeight="bold">英文 - 图片内容</Text>
            <Textarea
              value={enData?.imageContent || ''}
              onChange={(e) =>
                setEnData({
                  ...enData,
                  imageContent: e.target.value,
                })
              }
              placeholder="图片地址"
            />
          </Flex>
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
