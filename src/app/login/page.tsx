import { PageParam } from '@/type';
import LoginPage from './index';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { parseLang, getSession } from '@/utils';

export default async function Page({ searchParams }: PageParam) {
  const lang = await parseLang(searchParams);
  const session = await getSession(cookies);

  if (session.isLoggedIn) {
    redirect('/control')
  }

  return <LoginPage lang={lang} />;
}
