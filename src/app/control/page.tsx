import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { getSession, prisma, parseJsonValue } from '@/utils';
import Page from './index';

const getDatas = async () => {
  const cultureData = await prisma.culture.findFirst();
  const mainPageData = await prisma.main_page.findFirst();
  const categoryData = await prisma.category.findFirst();
  const productData = await prisma.product.findMany();

  return {
    cultureData,
    mainPageData,
    categoryData,
    productData,
  }
}

export default async function ControlPage() {
  const session = await getSession(cookies);
  const data = await getDatas();

  if (!session.isLoggedIn) {
    redirect('/')
  }

  return <Page />;
}
