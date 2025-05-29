import type { PageParam } from '@/type';
import { ParseLang } from '@/utils';
import { Flex, Heading, Box, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const products = [
  {
    id: 1,
    image: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    title: { zh: '产品1', en: 'Product 1' },
    description: { zh: '产品1描述', en: 'Product 1 description' }
  },
  {
    id: 2,
    image: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    title: { zh: '产品2', en: 'Product 2' },
    description: { zh: '产品2描述', en: 'Product 2 description' }
  },
  {
    id: 3,
    image: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    title: { zh: '产品3', en: 'Product 3' },
    description: { zh: '产品3描述', en: 'Product 3 description' }
  },
  {
    id: 4,
    image: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    title: { zh: '产品4', en: 'Product 4' },
    description: { zh: '产品4描述', en: 'Product 4 description' }
  },
  {
    id: 5,
    image: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    title: { zh: '产品5', en: 'Product 5' },
    description: { zh: '产品5描述', en: 'Product 5 description' }
  }
];

const news = [
  {
    id: 1,
    title: { zh: '新闻标题1', en: 'News Title 1' },
    path: '/news/1'
  },
  {
    id: 2, 
    title: { zh: '新闻标题2', en: 'News Title 2' },
    path: '/news/2'
  },
  {
    id: 3,
    title: { zh: '新闻标题3', en: 'News Title 3' },
    path: '/news/3'
  },
  {
    id: 4,
    title: { zh: '新闻标题4', en: 'News Title 4' },
    path: '/news/4'
  },
  {
    id: 5,
    title: { zh: '新闻标题5', en: 'News Title 5' },
    path: '/news/5'
  }
];

export default async function Home({ searchParams }: PageParam) {
  const locale = await ParseLang(searchParams);
  
  return (
    <Box as="main" className="flex min-h-screen flex-col">
      {/* 顶部图片展示位 */}
      <Box 
        w="full" 
        h="300px" 
        bg="gray.100" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Image src="/test_banner.jpg" alt="Banner" maxH="100%" w="100vw"/>
      </Box>

      {/* 产品区域 */}
      <Box className="mt-[24px] mb-[72px] pr-[24px] pl-[24px] md:pr-[144px] md:pl-[144px]">
        <Heading as="h2" size="5xl" mb={6} textAlign="center" color={"var(--color-darkblue)"}>
          {locale === 'zh' ? '产品' : 'PRODUCTS'}
        </Heading>
        
        <Flex 
          gap={'8px'} 
          wrap="wrap" 
          justify="space-evenly"
          className="w-full"
        >
          {products.map((product) => (
            <Box 
              key={product.id}
              className="w-[200px]"
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden"
              p={4}
            >
              <Image src={product.image} alt={product.title[locale]} h="120px" mx="auto" />
              <Box mt={4}>
                <Heading as="h3" size="md">{product.title[locale]}</Heading>
                <Text mt={2}>{product.description[locale]}</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* 新闻区域 */}
      <Box className="mt-12 w-full py-8 text-white" backgroundImage={"url(https://ufi-aftermarket.com/wp-content/uploads/2018/03/bg-footer.jpg)"}>
        <Box className="px-[24px] md:px-[144px]">
          <Heading as="h2" size="5xl" mb={6} textAlign="center">
            {locale === 'zh' ? '新闻' : 'NEWS'}
          </Heading>
          
          <Box className="flex flex-col gap-1">
            {news.map((item) => (
              <Link 
                key={item.id}
                href={item.path}
                className="h-[36px] flex items-center opacity-85 hover:opacity-100 px-2 rounded"
              >
                <Text fontSize="md">{item.title[locale]}</Text>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
