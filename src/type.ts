export type PageParam = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export type RootLayoutParam = Readonly<{
    children: React.ReactNode
}>

export type CultureContent = {
    zh: {
        backgroundImage?: string
        textContent?: string
        imageContent?: string
    }
    en: {
        backgroundImage?: string
        textContent?: string
        imageContent?: string
    }
}

export type ProfileStructureContent = {
    zh: {
        backgroundImage?: string
        textContent?: string
        imageContent?: string
    }
    en: {
        backgroundImage?: string
        textContent?: string
        imageContent?: string
    }
}

export type ProfileStructurePrisma = {
    data: ProfileStructureContent
}

export type BrandContent = {
    zh: {
        backgroundImage?: string
        textContent?: string
        imageContent?: string
    }
    en: {
        backgroundImage?: string
        textContent?: string
        imageContent?: string
    }
}

export type BrandPrisma = {
    data: BrandContent
}

export type MainPrisma = {
    banner: string
    products: {
        image: string
        title: { zh: string; en: string }
        description: { zh: string; en: string }
        url: string
    }[]
}

export type CulturePrisma = {
    data: CultureContent
}

export type CategoryPrisma = {
    types: string[]
    types_en: string[]
}

export type ProductPrisma = {
    id: number
    name: string
    type: string
    hlw: string
    manufacturer: string[]
    oem_no: string[]
    ref_no: {
        brand: string
        product_no: string
    }[]
    machine_model: string[]
    desc_app?: string
    price?: string
    cu_m3?: string
    desc_zh?: string
    desc_en?: string
}
