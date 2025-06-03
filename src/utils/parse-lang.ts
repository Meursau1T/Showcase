import { PageParam } from "@/type";

/** Page通过参数解析得到Lang */
export const parseLang = async (params: PageParam['searchParams']) => {
  const syncParams = await params;
  if (!syncParams) {
    return 'en';
  }
  const lang = syncParams['lang'] || 'en';
  return lang === 'zh' ? 'zh' : 'en';
}

export const getLang = () => {
  const lang = (new URLSearchParams(location.search)).get('lang');
  return lang === 'zh' ? 'zh' : 'en';
}
