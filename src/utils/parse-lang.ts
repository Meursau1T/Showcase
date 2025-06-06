import { PageParam } from "@/type";

/** Page通过参数解析得到Lang */
export const parseLang = async (params: PageParam['searchParams']) => {
  if (typeof params === 'undefined') {
    return 'en';
  }
  const lang = (await params)['lang'] || 'en';
  return lang === 'zh' ? 'zh' : 'en';
}
