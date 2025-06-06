'use client'

import { Box, Flex, Heading } from '@chakra-ui/react'
import MainPageEditor from './MainPageEditor'
import ProductEditor from './ProductEditor'
import CategoryEditor from './CategoryEditor'
import CultureEditor from './CultureEditor'

export default function ControlIndex() {
  return (
    <Box p="72px">
      <Flex direction="column" gap="8">
        <Heading size="xl">控制面板</Heading>
        <MainPageEditor />
        <ProductEditor />
        <CategoryEditor />
        <CultureEditor />
      </Flex>
    </Box>
  )
}
