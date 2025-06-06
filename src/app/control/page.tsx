import { PageParam } from '@/type';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { parseLang, getSession } from '@/utils';

export default async function ControlPage({ searchParams }: PageParam) {
  const lang = await parseLang(searchParams);
  const session = await getSession(cookies);

  if (!session.isLoggedIn) {
    redirect('/')
  }

  return <div>{'Control'}</div>;
}
