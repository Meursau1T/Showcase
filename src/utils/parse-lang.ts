import { PageParam } from "@/type";

export const ParseLang = async (params: PageParam['searchParams']) => {
  const lang = (await params)['lang'];
  if (lang === 'zh') {
    return 'zh';
  } else {
    return 'en';
  }
}
