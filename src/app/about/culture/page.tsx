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

export default async function AboutCulturePage() {
    const lang = (await cookies()).get('lang')?.value as 'zh' | 'en'
    const cultureData = await prisma.culture.findFirst()

    // 定义不同语言的文化内容
    const cultureContent = parseJsonValue(cultureData?.data, defaultVal)

    // 获取当前语言的内容，默认为英文
    const content = cultureContent[lang] || cultureContent.en

    return (
        <CommonDetail
            backgroundImage={content.backgroundImage}
            textContent={content.textContent}
            imageContent={content.imageContent}
        />
    )
}
