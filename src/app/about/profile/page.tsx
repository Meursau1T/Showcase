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

export default async function AboutProfilePage() {
    const lang = (await cookies()).get('lang')?.value as 'zh' | 'en'
    const profileData = await prisma.profile.findFirst()
    
    // 定义不同语言的简介内容
    const profileContent = parseJsonValue(profileData?.data, defaultVal)
    
    // 获取当前语言的内容，默认为英文
    const content = profileContent[lang] || profileContent.en
    
    return (
        <CommonDetail
            backgroundImage={content.backgroundImage}
            textContent={content.textContent}
            imageContent={content.imageContent}
        />
    )
}
