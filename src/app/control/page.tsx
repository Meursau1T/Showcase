import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { getSession, prisma } from '@/utils';
import type { CulturePrisma, MainPrisma, CategoryPrisma } from '@/type';
import Page from './index';

/**
 * 获取文化页数据并按 CulturePrisma 类型解析
 */
const getCultureData = async (): Promise<CulturePrisma | null> => {
  const data = await prisma.culture.findFirst();
  if (!data) return null;

  return {
    data: {
      zh: {
        backgroundImage: (data.data as any).zh.backgroundImage ?? undefined,
        textContent: (data.data as any).zh.textContent ?? undefined,
        imageContent: (data.data as any).zh.imageContent ?? undefined,
      },
      en: {
        backgroundImage: (data.data as any).en.backgroundImage ?? undefined,
        textContent: (data.data as any).en.textContent ?? undefined,
        imageContent: (data.data as any).en.imageContent ?? undefined,
      },
    },
  };
};

/**
 * 获取首页 Banner 数据并按 MainPrisma 类型解析
 */
const getMainPageData = async (): Promise<MainPrisma | null> => {
  const data = await prisma.main_page.findFirst();
  if (!data) return null;

  return {
    banner: data.banner,
  };
};

/**
 * 获取分类数据并按 CategoryPrisma 类型解析
 */
const getCategoryData = async (): Promise<CategoryPrisma | null> => {
  const data = await prisma.category.findFirst();
  if (!data) return null;

  return {
    types: data.types && Array.isArray(data.types) ? data.types as string[] : [],
    types_en: data.types_en && Array.isArray(data.types_en) ? data.types_en as string[] : [],
  };
};

export default async function ControlPage() {
  const session = await getSession(cookies);
  if (!session.isLoggedIn) {
    redirect('/')
  }

  // 并行请求数据
  const [cultureData, mainPageData, categoryData] = await Promise.all([
    getCultureData(),
    getMainPageData(),
    getCategoryData(),
  ]);

  return (
    <Page
      cultureData={cultureData}
      mainPageData={mainPageData}
      categoryData={categoryData}
    />
  );
}
