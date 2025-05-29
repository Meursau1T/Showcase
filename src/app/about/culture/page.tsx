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
      backgroundImage: '/test_banner.jpg',
      textContent: `
# Culture
Our corporate culture is built on three core values:
      
1. **Innovation** - We constantly challenge the status quo
2. **Integrity** - We do what's right, not what's easy
3. **Collaboration** - Together we achieve more`,
    },
    zh: {
      backgroundImage: '/test_banner.jpg',
      textContent: `
# 企业文化

我们的核心价值观包括：

- **创新**：持续改进产品和技术
- **诚信**：对客户和员工保持透明
- **协作**：跨部门合作实现共同目标

了解更多：[公司官网](https://example.com)`,
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
