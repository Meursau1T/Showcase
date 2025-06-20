"use client";
import { useState, useMemo } from 'react';
import { Box, Flex, Input, Button, Checkbox, Grid, Text, Select, createListCollection, Image } from '@chakra-ui/react';
import { productsText } from './products-lang';

type Props = {
  types: string[];
  types_en: string[];
  lang: 'zh' | 'en';
}

export function ProductsClientContainer({ types, types_en, lang }: Props) {
  const filterOptions = lang === 'zh' ? types : types_en;
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
    category: filterOptions[i % 5],
    imgUrl: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png'
  }));

  // 分页逻辑
  const itemsPerPage = 20;
  const filteredProducts = useMemo(() =>
    mockProducts.filter(p => {
      const matchesFilter = filters.length === 0 || filters.includes(p.category);
      const matchesSearch = searchTerm === '' ||
        (searchType === 'name'
          ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
          : p.oem.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    })
  , [mockProducts, searchType]);
  
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
          onValueChange={({ value }) => setSearchType(value[0] as typeof searchType)}
          collection={searchOptionsCollection}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder={productsText.searchOptions.label[lang]} />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
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
        <Box bg="gray.50" p={4} borderRadius="xs">
          <Text fontWeight="bold" mb={3} fontSize="lg">
            {productsText.categories[lang]}
          </Text>
          {filterOptions.map((option) => (
            <Checkbox.Root
              variant={'solid'}
              key={option}
              checked={filters.includes(option)}
              onChange={() => toggleFilter(option)}
              className="mr-[12px]"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{option}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Box>

        {/* 产品展示区 */}
        <Box>
          {/* 产品网格 */}
          {paginatedProducts.length > 0 ? (
            <>
              <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={4}>
                {paginatedProducts.map(product => {
                  const categoryText = filterOptions
                    .find(opt => opt === product.category) || '';
                  
                  return (
                    <Box 
                      key={product.id} 
                      borderWidth="1px" 
                      p={4} 
                      borderRadius="xs"
                      boxShadow="sm"
                      _hover={{ boxShadow: 'md' }}
                    >
                      {/* 展示图片 */}
                      <Box mb={3} h="150px">
                        <Image
                          src={product.imgUrl}
                          alt={product.name}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          borderRadius="xs"
                        />
                      </Box>

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
                    disabled={currentPage === 1}
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
                    disabled={currentPage === 1}
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
