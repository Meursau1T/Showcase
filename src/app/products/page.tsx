"use client";
import { useState } from 'react';
import { Box, Flex, Input, Button, Checkbox, Grid, Text } from '@chakra-ui/react';
import { Select, createListCollection } from '@chakra-ui/react';
import { productsText } from './products-lang';
import { PageParam } from '@/type';

export default function ProductsPage({ searchParams }: PageParam) {
  const lang = searchParams?.lang === 'zh' ? 'zh' : 'en';
  
  // 创建搜索选项集合
  const searchOptionsCollection = createListCollection({
    items: [
      { label: productsText.searchOptions.name[lang], value: "name" },
      { label: productsText.searchOptions.oem[lang], value: "oem" },
    ],
  });
  const [searchType, setSearchType] = useState<'name' | 'oem'>('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 切换筛选器状态
  const toggleFilter = (filterKey: string) => {
    setFilters(prev => 
      prev.includes(filterKey) 
        ? prev.filter(f => f !== filterKey) 
        : [...prev, filterKey]
    );
    setCurrentPage(1); // 重置到第一页
  };

  // 模拟产品数据
  const mockProducts = [...Array(50)].map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    oem: `OEM-${String(i+1).padStart(4, '0')}`,
    category: productsText.filterOptions[i % 5].key
  }));

  // 分页逻辑
  const itemsPerPage = 20;
  const filteredProducts = mockProducts.filter(p => {
    const matchesFilter = filters.length === 0 || filters.includes(p.category);
    const matchesSearch = searchTerm === '' || 
      (searchType === 'name' 
        ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
        : p.oem.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box p={8} maxW="1200px" mx="auto">
      {/* 搜索提示 */}
      <Text fontSize="xl" mb={4} fontWeight="medium">
        {productsText.searchHint[lang]}
      </Text>

      {/* 搜索栏 */}
      <Flex mb={8} gap={2} alignItems="center">
        <Select.Root 
          width="150px"
          value={searchType}
          onChange={({ value }) => setSearchType(value as "name" | "oem")}
          collection={searchOptionsCollection}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {searchOptionsCollection.items.map((option) => (
                <Select.Item key={option.value} item={option}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
        
        <Input
          flex={1}
          placeholder={productsText.searchPlaceholder[lang]}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="md"
          onKeyPress={(e) => e.key === 'Enter' && setCurrentPage(1)}
        />
        
        <Button 
          colorScheme="blue" 
          px={6}
          onClick={() => setCurrentPage(1)}
        >
          {productsText.searchButton[lang]}
        </Button>
      </Flex>

      {/* 内容区 */}
      <Grid templateColumns={{ base: "1fr", md: "200px 1fr" }} gap={6}>
        {/* 筛选侧边栏 */}
        <Box bg="gray.50" p={4} borderRadius="md">
          <Text fontWeight="bold" mb={3} fontSize="lg">
            {productsText.categories[lang]}
          </Text>
          {productsText.filterOptions.map((option) => (
            <Checkbox
              key={option.key}
              isChecked={filters.includes(option.key)}
              onChange={() => toggleFilter(option.key)}
              display="block"
              mb={2}
              colorScheme="blue"
            >
              {option[lang]}
            </Checkbox>
          ))}
        </Box>

        {/* 产品展示区 */}
        <Box>
          {/* 产品网格 */}
          {paginatedProducts.length > 0 ? (
            <>
              <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
                {paginatedProducts.map(product => {
                  const categoryText = productsText.filterOptions
                    .find(opt => opt.key === product.category)?.[lang] || '';
                  
                  return (
                    <Box 
                      key={product.id} 
                      borderWidth="1px" 
                      p={4} 
                      borderRadius="md"
                      boxShadow="sm"
                      _hover={{ boxShadow: 'md' }}
                    >
                      <Text fontWeight="medium">{product.name}</Text>
                      <Text fontSize="sm" color="gray.600" mt={1}>
                        {lang === 'zh' ? 'OEM编码: ' : 'OEM: '}{product.oem}
                      </Text>
                      <Text fontSize="sm" color="blue.600" mt={2}>
                        {categoryText}
                      </Text>
                    </Box>
                  )
                })}
              </Grid>

              {/* 分页器 */}
              {totalPages > 1 && (
                <Flex mt={8} justify="center" gap={2} flexWrap="wrap">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    isDisabled={currentPage === 1}
                    size="sm"
                  >
                    &lt;
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(
                      totalPages - 4, 
                      currentPage - 2
                    )) + i;
                    return pageNum <= totalPages ? (
                      <Button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        colorScheme={currentPage === pageNum ? 'blue' : 'gray'}
                        variant={currentPage === pageNum ? 'solid' : 'outline'}
                        size="sm"
                      >
                        {pageNum}
                      </Button>
                    ) : null;
                  })}
                  
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    isDisabled={currentPage === totalPages}
                    size="sm"
                  >
                    &gt;
                  </Button>
                </Flex>
              )}
            </>
          ) : (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" color="gray.500">
                {productsText.noProducts[lang]}
              </Text>
            </Box>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
