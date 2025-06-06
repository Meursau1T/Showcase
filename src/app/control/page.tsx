import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { getSession } from '@/utils';
import Page from './index';

export default async function ControlPage() {
  const session = await getSession(cookies);

  if (!session.isLoggedIn) {
    redirect('/')
  }

  return <Page />;
}
