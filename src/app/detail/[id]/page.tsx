import { Box, Flex, Text, Table, Heading } from '@chakra-ui/react';
import { parseLang } from '@/lib/lang'; // 假设 parseLang 在 lib/lang.ts 中定义

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

export default async function DetailPage({ searchParams }: { searchParams: Record<string, string> }) {
  const lang = await parseLang(searchParams);

  // MOCK 数据
  const data = {
    img: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png',
    text: '这是一段关于产品的详细介绍文本。你可以在这里写产品的功能、特点、优势等内容。',
    table: [
      { title: '品牌', value: '钰铭' },
      { title: '型号', value: 'YM-12345' },
      { title: '材质', value: '不锈钢' },
      { title: '重量', value: '1.2kg' },
      { title: '适用车型', value: '大众 / 丰田 / 本田' },
      { title: '保修期', value: '1年' },
    ],
  };

  return (
    <main className="flex flex-col w-full p-8 md:p-12 pt-8 md:pt-12 font-[family-name:var(--font-geist-sans)]">
      {/* 页面内容顶部间距 */}
      <Box mt="8" maxW="1200px" mx="auto" w="full">
        {/* 左右布局 */}
        <Flex direction={{ base: 'column', md: 'row' }} gap="12" alignItems="start">
          {/* 左侧图片区域 */}
          <Box w={{ base: 'full', md: '400px' }} h="full" flexShrink={0}>
            <Box
              w="full"
              h="full"
              bg="gray.200"
              borderRadius="md"
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

          {/* 右侧商品描述区域 */}
          <Box w="full" flex="1" display="flex" flexDirection="column" gap="6">
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
