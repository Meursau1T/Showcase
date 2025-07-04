import type { PageParam } from '@/type';
import { prisma } from '@/utils';
import { Flex, Heading, Box, Image, Card, Link } from '@chakra-ui/react';
import { cookies } from 'next/headers';

const products = [
  {
    id: 1,
    image: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    title: { zh: '欧美纸芯', en: 'Element Filter' },
    description: { zh: '产品1描述', en: 'Product 1 description' }
  },
  {
    id: 2,
    image: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    title: { zh: 'Air Filter', en: 'Air Filter' },
    description: { zh: '产品2描述', en: 'Product 2 description' }
  },
  {
    id: 3,
    image: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    title: { zh: '日系', en: 'Japan Filter' },
    description: { zh: '产品3描述', en: 'Product 3 description' }
  },
  {
    id: 4,
    image: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    title: { zh: '冷气', en: 'Cabin Filter' },
    description: { zh: '产品4描述', en: 'Product 4 description' }
  },
];

export default async function Home() {
  const locale = ((await cookies()).get('lang')?.value || 'en') as 'zh' | 'en';
  const bannerStorage = await prisma.main_page.findFirst();
  const categoryStorage = await prisma.category.findMany();
  
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
        <Image src={bannerStorage?.banner || '/test_banner.jpg'} alt="Banner" maxH="100%" w="100vw"/>
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
            <Link 
              key={product.id}
              href={`/products?tab=${product.title.en.toLowerCase().replace(/\s+/g, '') }`}
              textDecoration="none"
              focusRing="none"
            >
              <Card.Root
                key={product.id}
                className="w-[200px]"
                overflow="hidden"
                variant="subtle"
                borderRadius="0"
              >
                <Image src={product.image} alt={product.title[locale]} h="120px" mx="auto" />
                <Card.Body gap="2">
                  <Card.Title>{product.title[locale]}</Card.Title>
                  <Card.Description>{product.description[locale]}</Card.Description>
                </Card.Body>
              </Card.Root>
            </Link>
          ))}
        </Flex>
      </Box>

      {/* 新闻区域 */}
    </Box>
  );
}
