import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSession, prisma } from '@/utils'
import type { CulturePrisma, MainPrisma, CategoryPrisma, ProductPrisma, PageParam } from '@/type'
import Page from './index'

/**
 * 获取文化页数据并按 CulturePrisma 类型解析
 */
const getCultureData = async (): Promise<CulturePrisma | null> => {
    const data = await prisma.culture.findFirst()
    if (!data) return null

    return {
        data: {
            zh: {
                backgroundImage: (data.data as any).zh.backgroundImage ?? undefined,
                textContent: (data.data as any).zh.textContent ?? undefined,
                imageContent: (data.data as any).zh.imageContent ?? undefined,
            },
            en: {
                backgroundImage: (data.data as any).en.backgroundImage ?? undefined,
                textContent: (data.data as any).en.textContent ?? undefined,
                imageContent: (data.data as any).en.imageContent ?? undefined,
            },
        },
    }
}

/**
 * 获取首页 Banner 数据并按 MainPrisma 类型解析
 */
const getMainPageData = async (): Promise<MainPrisma | null> => {
    const data = await prisma.main_page.findFirst()
    if (!data) return null

    return {
        banner: data.banner,
        products: data.products as any,
    }
}

/**
 * 获取分类数据并按 CategoryPrisma 类型解析
 */
const getCategoryData = async (): Promise<CategoryPrisma | null> => {
    const data = await prisma.category.findFirst()
    if (!data) return null

    return {
        types: data.types && Array.isArray(data.types) ? (data.types as string[]) : [],
        types_en: data.types_en && Array.isArray(data.types_en) ? (data.types_en as string[]) : [],
    }
}

/**
 * 获取商品数据并按 ProductPrisma 类型解析
 */
const getProductData = async (): Promise<ProductPrisma[] | null> => {
    const data = await prisma.product.findMany()
    if (!data || data.length === 0) return null

    return (data as ProductPrisma[]).map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        hlw: item.hlw,
        manufacturer: Array.isArray(item.manufacturer) ? item.manufacturer : [],
        oem_no: Array.isArray(item.oem_no) ? item.oem_no : [],
        ref_no: Array.isArray(item.ref_no) ? item.ref_no : [],
        machine_model: Array.isArray(item.machine_model) ? item.machine_model : [],
        desc_app: item.desc_app ?? '',
        price: item.price ?? '',
        cu_m3: item.cu_m3 ?? '',
        desc_zh: item.desc_zh ?? '',
        desc_en: item.desc_en ?? '',
    }))
}

/**
 * 获取 profile structure 数据并按 ProfileStructurePrisma 类型解析
 */
const getProfileStructureData = async (): Promise<CulturePrisma | null> => {
    const data = await prisma.profile.findFirst()
    if (!data) return null

    return {
        data: {
            zh: {
                backgroundImage: (data.data as any).zh.backgroundImage ?? undefined,
                textContent: (data.data as any).zh.textContent ?? undefined,
                imageContent: (data.data as any).zh.imageContent ?? undefined,
            },
            en: {
                backgroundImage: (data.data as any).en.backgroundImage ?? undefined,
                textContent: (data.data as any).en.textContent ?? undefined,
                imageContent: (data.data as any).en.imageContent ?? undefined,
            },
        },
    }
}

/**
 * 获取 brand 数据并按 BrandPrisma 类型解析
 */
const getBrandData = async (): Promise<CulturePrisma | null> => {
    const data = await prisma.brand.findFirst()
    if (!data) return null

    return {
        data: {
            zh: {
                backgroundImage: (data.data as any).zh.backgroundImage ?? undefined,
                textContent: (data.data as any).zh.textContent ?? undefined,
                imageContent: (data.data as any).zh.imageContent ?? undefined,
            },
            en: {
                backgroundImage: (data.data as any).en.backgroundImage ?? undefined,
                textContent: (data.data as any).en.textContent ?? undefined,
                imageContent: (data.data as any).en.imageContent ?? undefined,
            },
        },
    }
}

/**
 * 获取 structure 数据并按 StructurePrisma 类型解析
 */
const getStructureData = async (): Promise<StructurePrisma | null> => {
    const data = await prisma.struct.findFirst()
    if (!data) return null

    return {
        data: {
            zh: {
                backgroundImage: (data.data as any).zh.backgroundImage ?? undefined,
                textContent: (data.data as any).zh.textContent ?? undefined,
                imageContent: (data.data as any).zh.imageContent ?? undefined,
            },
            en: {
                backgroundImage: (data.data as any).en.backgroundImage ?? undefined,
                textContent: (data.data as any).en.textContent ?? undefined,
                imageContent: (data.data as any).en.imageContent ?? undefined,
            },
        },
    }
}

export default async function ControlPage({ searchParams }: PageParam) {
    const tab = (await searchParams)['tab']?.toString() || ''
    const session = await getSession(cookies)
    if (!session.isLoggedIn) {
        redirect('/')
    }

    // 并行请求数据
    const [cultureData, mainPageData, categoryData, productData, profileStructureData, brandData, structureData] =
        await Promise.all([
        getCultureData(),
        getMainPageData(),
        getCategoryData(),
        getProductData(),
        getProfileStructureData(),
        getBrandData(),
        getStructureData(),
    ])

    return (
        <Page
            cultureData={cultureData}
            mainPageData={mainPageData}
            categoryData={categoryData}
            productData={productData}
            profileStructureData={profileStructureData}
            brandData={brandData}
            structureData={structureData}
            tab={tab}
        />
    )
}
