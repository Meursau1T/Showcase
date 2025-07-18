import { PageParam } from '@/type'
import { ProductsClientContainer } from './index'
import { prisma } from '@/utils'
import { cookies } from 'next/headers'

// 获取产品类型数据
async function getProductTypes(): Promise<{ types: string[]; types_en: string[] }> {
    const categoryStorage = await prisma.category.findFirst()
    if (categoryStorage) {
        const { types_en, types } = categoryStorage
        return { types_en: types_en as string[], types: types as string[] }
    } else {
        return { types: [], types_en: [] }
    }
}

export default async function ProductsPage({ searchParams }: PageParam) {
    const lang = ((await cookies()).get('lang')?.value || 'en') as 'zh' | 'en'
    const tab = (await searchParams)['tab']?.toString() || ''
    const { types_en, types } = await getProductTypes()

    // 获取真实产品数据（只获取必要字段）
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            type: true,
            oem_no: true,
        },
    })

    return (
        <ProductsClientContainer
            types={types}
            types_en={types_en}
            lang={lang}
            tab={tab}
            products={products} // 传递真实数据
        />
    )
}
