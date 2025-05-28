import { isInSSR } from "./is-in-ssr";

type Lang = 'en' | 'zh';

export function getLocale(): Lang {
  if (isInSSR()) {
    return 'en';
  }
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const lang = params.get('lang');
  return lang === 'zh' ? 'zh' : 'en';
}
