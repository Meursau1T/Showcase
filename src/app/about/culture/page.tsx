import { CommonDetail } from '@/components/ui/common-detail';
import { ParseLang } from '@/utils/parse-lang';
import type { PageParam } from '@/type';

// 定义文化内容的数据结构
interface CultureContent {
  backgroundImage: string;
  textContent: string;
  imageContent?: string;
}

export default async function AboutCulturePage({ searchParams }: PageParam) {
  const lang = await ParseLang(searchParams);
  
  // 定义不同语言的文化内容
  const cultureContent: Record<string, CultureContent> = {
    en: {
      backgroundImage: '/public/test_banner.jpg',
      textContent: `Our corporate culture is built on three core values:
      
      1. Innovation - We constantly challenge the status quo
      2. Integrity - We do what's right, not what's easy
      3. Collaboration - Together we achieve more`,
    },
    zh: {
      backgroundImage: '/public/test_banner.jpg',
      textContent: `我们的企业文化建立在三个核心价值观之上：
      
      1. 创新 - 我们不断挑战现状
      2. 诚信 - 我们做正确的事，而不是容易的事
      3. 协作 - 团结一致，我们才能取得更多成就`,
    }
  };

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
