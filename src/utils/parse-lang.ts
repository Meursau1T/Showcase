import { PageParam } from "@/type";

/** Page通过参数解析得到Lang */
export const ParseLang = async (params: PageParam['searchParams']) => {
  const lang = (await params)['lang'];
  return lang === 'zh' ? 'zh' : 'en';
}
