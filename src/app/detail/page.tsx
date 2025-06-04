import { Box, Flex, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

export default function DetailPage() {
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
    <main className="flex min-h-screen flex-col items-center justify-center p-12 font-[family-name:var(--font-geist-sans)]">
      <Box w="full" maxW="1200px" mx="auto">
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
            {/* 文本描述 */}
            <Text fontSize="lg" color="gray.700" lineHeight="1.8">
              {data.text}
            </Text>

            {/* 表格 */}
            <Box overflowX="auto">
              <Table variant="simple" size="md" borderColor="gray.300">
                <Tbody>
                  {data.table.map((item, index) => (
                    <Tr key={index}>
                      <Th borderColor="gray.300" fontWeight="bold" width="120px">
                        {item.title}
                      </Th>
                      <Td borderColor="gray.300">{item.value}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Flex>
      </Box>
    </main>
  );
}
