import { Box, Flex, Text, Table, Heading } from '@chakra-ui/react';
import { parseLang } from '@/utils';
import { PageParam } from '@/type';
import { parseJsonValue, prisma } from '@/utils/prisma';
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

  // 获取分类数据
  const categoryData = await prisma.category.findFirst();

  // 提取中英文类型列表
  const typesZh = parseJsonValue(categoryData?.types, ['']);
  const typesEn = parseJsonValue(categoryData?.types_en, ['']);

  // 查找英文类型在 types_en 中的索引
  const typeIndex = typesZh.indexOf(productData?.type || '');

  // 根据索引获取中文名称，若无对应则保留原值
  const enType = typeIndex !== -1 && typesEn[typeIndex] ? typesEn[typeIndex] : productData?.type || '';

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

  // 构建表格数据并过滤空值
  const tableData = [
    { title: lang === 'zh' ? '品牌' : 'Brand', value: productData.manufacturer?.[0] || '' },
    { title: lang === 'zh' ? '型号' : 'Model', value: productData.name },
    { title: lang === 'zh' ? '长宽高' : 'HLW', value: productData.hlw },
    { title: lang === 'zh' ? '类型' : 'Type', value: lang === 'zh' ? productData.type : enType },
    { title: lang === 'zh' ? 'OEM编号' : 'OEM No.', value: productData.oem_no?.join('\n') || '' },
    { title: lang === 'zh' ? '参考编号' : 'Ref. No.', value: productData.ref_no.map(r => `${r.brand} ${r.product_no}`).join('\n') || '' },
    { title: lang === 'zh' ? '适配机型' : 'Machine Model', value: productData.machine_model.join('\n') || '' },
    { title: lang === 'zh' ? '描述/应用' : 'Description/Application', value: productData.desc_app || '' },
    { title: lang === 'zh' ? '价格' : 'Price', value: productData.price || '' },
    { title: lang === 'zh' ? '体积' : 'Volume (cu/m³)', value: productData.cu_m3 || '' },
  ].filter(item => item.value); // 过滤掉 value 为空或空字符串的项

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
                    <Table.ColumnHeader>内容</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.table.map((item, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{item.title}</Table.Cell>
                      <Table.Cell whiteSpace="break-spaces">{item.value}</Table.Cell>
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
