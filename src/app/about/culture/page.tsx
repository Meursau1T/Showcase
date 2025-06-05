import { CommonDetail } from '@/components/ui/common-detail';
import { parseLang, prisma } from '@/utils';
import type { PageParam } from '@/type';
import type { JsonValue } from '@prisma/client/runtime/client';

// 定义文化内容的数据结构
interface CultureContent {
  backgroundImage: string;
  textContent: string;
  imageContent?: string;
}

const parseContent = (data: JsonValue, default): Record<string, CultureContent> => {
  if (!data || typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    return default;
  }
  if (Object.hasOwn(data, 'backgroundImage') && )
}

export default async function AboutCulturePage({ searchParams }: PageParam) {
  const lang = await parseLang(searchParams);
  const cultureData = await prisma.culture.findFirst();
  
  // 定义不同语言的文化内容
  const cultureContent = cultureData?.data;

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
