import { Flex, Heading, Box, Image, Text } from '@chakra-ui/react';
import { getLocale } from '@/utils/get-locale';

const products = [
  {
    id: 1,
    image: '/next.svg',
    title: { zh: '产品1', en: 'Product 1' },
    description: { zh: '产品1描述', en: 'Product 1 description' }
  },
  {
    id: 2,
    image: '/next.svg',
    title: { zh: '产品2', en: 'Product 2' },
    description: { zh: '产品2描述', en: 'Product 2 description' }
  },
  {
    id: 3,
    image: '/next.svg',
    title: { zh: '产品3', en: 'Product 3' },
    description: { zh: '产品3描述', en: 'Product 3 description' }
  },
  {
    id: 4,
    image: '/next.svg',
    title: { zh: '产品4', en: 'Product 4' },
    description: { zh: '产品4描述', en: 'Product 4 description' }
  },
  {
    id: 5,
    image: '/next.svg',
    title: { zh: '产品5', en: 'Product 5' },
    description: { zh: '产品5描述', en: 'Product 5 description' }
  }
];

export default function Home() {
  const locale = getLocale();
  
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
        <Image src="/vercel.svg" alt="Banner" maxH="100%" />
      </Box>

      {/* 产品区域 */}
      <Box p={8}>
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          {locale === 'zh' ? '产品' : 'Products'}
        </Heading>
        
        <Flex 
          gap={6} 
          wrap="wrap" 
          justify="center"
        >
          {products.map((product) => (
            <Box 
              key={product.id}
              w="200px" 
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
    </Box>
  );
}
