'use client'

import { Box, Flex, Heading, Tabs } from '@chakra-ui/react'
import MainPageEditor from './MainPageEditor'
import ProductEditor from './ProductEditor'
import CategoryEditor from './CategoryEditor'
import CultureEditor from './CultureEditor'
import type { CategoryPrisma, CulturePrisma, MainPrisma, ProductPrisma } from '@/type'

interface Props {
  cultureData: CulturePrisma | null;
  mainPageData: MainPrisma | null;
  categoryData: CategoryPrisma | null;
  productData: ProductPrisma[] | null;
  tab: string;
}

export default function ControlIndex({ cultureData, mainPageData, categoryData, productData, tab }: Props) {
  const tabList = [
    { value: 'main', label: '首页编辑', component: <MainPageEditor data={mainPageData} /> },
    { value: 'product', label: '商品编辑', component: <ProductEditor data={productData} /> },
    { value: 'category', label: '分类编辑', component: <CategoryEditor data={categoryData} /> },
    { value: 'culture', label: '文化页编辑', component: <CultureEditor data={cultureData} /> },
  ];

  const getDefault = () => {
    if (tabList.find(i => i.value === tab)) {
      return tab;
    }
    return 'main';
  }

  return (
    <Box p="72px" minW="672px">
      <Flex direction="column" gap="8">
        <Heading size="4xl">控制面板</Heading>
        <Tabs.Root defaultValue={getDefault()} variant={'line'}>
          <Tabs.List>
            {tabList.map((tab) => (
              <Tabs.Trigger key={tab.value} value={tab.value}>
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {tabList.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value}>
              {tab.component}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Flex>
    </Box>
  )
}
