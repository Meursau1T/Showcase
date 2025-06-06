import { PageParam } from '@/type';
import LoginPage from './index';
import { parseLang } from '@/utils';

export default async function Page({ searchParams }: PageParam) {
  const lang = await parseLang(searchParams);
  return <LoginPage lang={lang} />;
}
