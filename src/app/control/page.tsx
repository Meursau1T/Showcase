import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { getSession, prisma, parseJsonValue } from '@/utils';
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
        backgroundImage: data.zh_backgroundImage ?? undefined,
        textContent: data.zh_textContent ?? undefined,
        imageContent: data.zh_imageContent ?? undefined,
      },
      en: {
        backgroundImage: data.en_backgroundImage ?? undefined,
        textContent: data.en_textContent ?? undefined,
        imageContent: data.en_imageContent ?? undefined,
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
    types: data.types ? data.types.split(',') : [],
    types_en: data.types_en ? data.types_en.split(',') : [],
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
