'use client'

import { Box, Flex, Heading, Tabs } from '@chakra-ui/react'
import MainPageEditor from './MainPageEditor'
import ProductEditor from './ProductEditor'
import CategoryEditor from './CategoryEditor'
import CultureEditor from './CultureEditor'
import ProfileEditor from './Profile'
import BrandEditor from './BrandEditor'
import StructureEditor from './StructureEditor'
import type {
    CategoryPrisma,
    CulturePrisma,
    MainPrisma,
    ProductPrisma,
    ProfileStructurePrisma,
    BrandPrisma,
} from '@/type'
import { ControlContext } from './ControlContext'

interface Props {
    cultureData: CulturePrisma | null
    mainPageData: MainPrisma | null
    categoryData: CategoryPrisma | null
    productData: ProductPrisma[] | null
    profileStructureData: ProfileStructurePrisma | null
    brandData: BrandPrisma | null
    structureData: StructurePrisma | null
    tab: string
}

export default function ControlIndex({
    cultureData,
    mainPageData,
    categoryData,
    productData,
    tab,
    profileStructureData,
    brandData,
    structureData,
}: Props) {
    const contextValue = {
        categoryData,
    }

    const tabList = [
        { value: 'main', label: '首页编辑', component: <MainPageEditor data={mainPageData} /> },
        { value: 'product', label: '商品编辑', component: <ProductEditor data={productData} /> },
        { value: 'category', label: '分类编辑', component: <CategoryEditor data={categoryData} /> },
        { value: 'culture', label: '文化页编辑', component: <CultureEditor data={cultureData} /> },
        { value: 'profile', label: '关于我们编辑', component: <ProfileEditor data={profileStructureData} /> },
        { value: 'brand', label: '品牌编辑', component: <BrandEditor data={brandData} /> },
        { value: 'structure', label: '组织架构编辑', component: <StructureEditor data={structureData} /> },
    ]

    const getDefault = () => {
        if (tabList.find((i) => i.value === tab)) {
            return tab
        }
        return 'main'
    }

    return (
        <ControlContext.Provider value={contextValue}>
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
        </ControlContext.Provider>
    )
}
