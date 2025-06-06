'use client'

import { Box, Flex, Heading, SimpleGrid, Tabs } from '@chakra-ui/react'
import MainPageEditor from './MainPageEditor'
import ProductEditor from './ProductEditor'
import CategoryEditor from './CategoryEditor'
import CultureEditor from './CultureEditor'

export default function ControlIndex() {
  const tabList = ['main', 'product', 'category', 'culture'];
  return (
    <Box p="72px">
      <Flex direction="column" gap="8">
        <Heading size="4xl">控制面板</Heading>
        <Tabs.Root defaultValue="main" variant={'line'}>
          <Tabs.List>
            <Tabs.Trigger value="main">
              首页编辑
            </Tabs.Trigger>
            <Tabs.Trigger value="product">
              商品编辑
            </Tabs.Trigger>
            <Tabs.Trigger value="category">
              分类编辑
            </Tabs.Trigger>
            <Tabs.Trigger value="culture">
              文化页编辑
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="main">
            <MainPageEditor />
          </Tabs.Content>
          <Tabs.Content value="product">
            <ProductEditor />
          </Tabs.Content>
          <Tabs.Content value="category">
            <CategoryEditor />
          </Tabs.Content>
          <Tabs.Content value="culture">
            <CultureEditor />
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </Box>
  )
}
