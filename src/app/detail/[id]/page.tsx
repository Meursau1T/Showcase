import { Box, Flex, Text, Table, Heading } from '@chakra-ui/react';
import { parseLang } from '@/utils';
import { PageParam } from '@/type';
import { prisma } from '@/utils/prisma';
import { ProductPrisma } from '@/type';

// 标题多语言内容
const titles = {
  zh: {
    description: '产品描述',
    specifications: '产品参数',
  },
  en: {
    description: 'Product Description',
    specifications: 'Specifications',
  },
};

export default async function DetailPage({ params, searchParams }: { params: { id: string }, searchParams: PageParam['searchParams'] }) {
  const lang = await parseLang(searchParams);
  const id = Number(params.id);

  // 使用 Prisma 获取产品数据
  const productData = await prisma.product.findUnique({
    where: { id },
  }) as ProductPrisma | null;

  if (!productData) {
    return (
      <main className="flex flex-col w-full p-8 md:p-12 pt-8 md:pt-12 font-[family-name:var(--font-geist-sans)]">
        <Box mt="8" w="full">
          <Text fontSize="xl" textAlign="center">
            {lang === 'zh' ? '产品未找到' : 'Product not found'}
          </Text>
        </Box>
      </main>
    );
  }

  // 构建表格数据
  const tableData = [
    { title: lang === 'zh' ? '品牌' : 'Brand', value: productData.manufacturer?.[0] || '' },
    { title: lang === 'zh' ? '型号' : 'Model', value: productData.name },
    { title: lang === 'zh' ? '长宽高' : 'HLW', value: productData.hlw },
    { title: lang === 'zh' ? '类型' : 'Type', value: productData.type },
    // 添加更多字段...
  ];

  // 使用实际产品数据
  const data = {
    img: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    text: lang === 'zh' ? '产品描述文本...' : 'Product description text...',
    table: tableData,
  };

  return (
    <main className="flex flex-col w-full p-8 md:p-12 pt-8 md:pt-12 font-[family-name:var(--font-geist-sans)]">
      {/* 页面内容顶部间距 */}
      <Box mt="8" w="full">
        {/* 左右布局 */}
        <Flex direction={{ base: 'column', md: 'row' }} gap="12" alignItems="start" w="full">
          {/* 左侧图片区域，占据剩余空间 */}
          <Box flex="1" minW="400px" h="full">
            <Box
              w="full"
              h="full"
              borderRadius="xs"
              overflow="hidden"
              boxShadow="md"
            >
              <img
                src={data.img}
                alt="产品图片"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Box>

          {/* 右侧商品描述区域，固定宽度 630px */}
          <Box w="630px" display="flex" flexDirection="column" gap="6">
            {/* 文本描述标题 */}
            <Heading as="h2" size="lg" fontWeight="bold">
              {titles[lang].description}
            </Heading>
            <Text fontSize="lg" color="gray.700" lineHeight="1.8">
              {data.text}
            </Text>

            {/* 表格标题 */}
            <Heading as="h3" size="md" fontWeight="bold" mt="6">
              {titles[lang].specifications}
            </Heading>

            {/* 表格 */}
            <Box overflowX="auto">
              <Table.Root size="md">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader fontWeight="bold">名称</Table.ColumnHeader>
                    <Table.ColumnHeader>值</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.table.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{item.title}</Table.Cell>
                      <Table.Cell>{item.value}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          </Box>
        </Flex>
      </Box>
    </main>
  );
}
