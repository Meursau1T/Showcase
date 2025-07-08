import { CommonDetail } from '@/components/ui/common-detail'
import { prisma, parseJsonValue } from '@/utils'
import type { PageParam, CultureContent } from '@/type'
import { cookies } from 'next/headers'

const defaultVal: CultureContent = {
    zh: {
        textContent: '内容设置错误',
    },
    en: {
        textContent: 'Wrong Content',
    },
}

export default async function BrandPage() {
    const lang = (await cookies()).get('lang')?.value as 'zh' | 'en'
    const brandData = await prisma.brand.findFirst()
    
    // 定义不同语言的品牌内容
    const brandContent = parseJsonValue(brandData?.data, defaultVal)
    
    // 获取当前语言的内容，默认为英文
    const content = brandContent[lang] || brandContent.en
    
    return (
        <CommonDetail
            backgroundImage={content.backgroundImage}
            textContent={content.textContent}
            imageContent={content.imageContent}
        />
    )
}
