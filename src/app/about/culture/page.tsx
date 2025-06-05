import { CommonDetail } from '@/components/ui/common-detail';
import { parseLang, prisma, parseJsonValue } from '@/utils';
import type { PageParam } from '@/type';

// 定义文化内容的数据结构
interface CultureContent {
  zh: {
    backgroundImage?: string;
    textContent?: string;
    imageContent?: string;
  },
  en: {
    backgroundImage?: string;
    textContent?: string;
    imageContent?: string;
  }
}

const defaultVal: CultureContent = {
  zh: {
    textContent: '内容设置错误',
  },
  en: {
    textContent: 'Wrong Content',
  }
};

export default async function AboutCulturePage({ searchParams }: PageParam) {
  const lang = await parseLang(searchParams);
  const cultureData = await prisma.culture.findFirst();
  
  // 定义不同语言的文化内容
  const cultureContent = parseJsonValue(cultureData?.data, defaultVal);

  // 获取当前语言的内容，默认为英文
  const content = cultureContent[lang] || cultureContent.en;

  return (
    <CommonDetail 
      backgroundImage={content.backgroundImage}
      textContent={content.textContent}
      imageContent={content.imageContent}
    />
  );
}
