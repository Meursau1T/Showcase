'use client'

import { useState } from 'react'
import { Box, Heading, Flex, Text, Input, Button } from '@chakra-ui/react'
import { CategoryPrisma } from '@/type'

interface Props {
  data: CategoryPrisma | null;
}

export default function CategoryEditor(props: Props) {
  const [typesStr, setTypesStr] = useState(
    Array.isArray(props.data?.types) ? props.data.types.join(', ') : ''
  );
  const [typesEnStr, setTypesEnStr] = useState(
    Array.isArray(props.data?.types_en) ? props.data.types_en.join(', ') : ''
  );

  const handleSubmit = async () => {
    const parsedZh = typesStr
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item);

    const parsedEn = typesEnStr
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item);

    const res = await fetch('/api/category/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ types: parsedZh, types_en: parsedEn }),
    });

    if (res.ok) {
      alert('分类更新成功');
    } else {
      alert('保存失败');
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>分类编辑</Heading>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">中文分类</Text>
          <Input
            value={typesStr}
            onChange={(e) => setTypesStr(e.target.value)}
            placeholder="用逗号分隔的中文分类"
          />
        </Flex>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">英文分类</Text>
          <Input
            value={typesEnStr}
            onChange={(e) => setTypesEnStr(e.target.value)}
            placeholder="用逗号分隔的英文分类"
          />
        </Flex>
        <Button colorScheme="blue" alignSelf="start" onClick={handleSubmit}>保存</Button>
      </Flex>
    </Box>
  )
}
