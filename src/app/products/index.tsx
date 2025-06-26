"use client";
import { useState, useMemo } from 'react';
// import Link from 'next/link';
import { Link, Box, Flex, Input, Button, Checkbox, Grid, Text, Select, createListCollection, Image, Pagination, IconButton, ButtonGroup } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { productsText } from './products-lang';

type Props = {
  types: string[];
  types_en: string[];
  lang: 'zh' | 'en';
  products: { id: number; name: string; type: string; oem_no: string[] }[]; // 简化类型
}

export function ProductsClientContainer({ 
  types, 
  types_en, 
  lang,
  products 
}: Props) {
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

  const itemsPerPage = 20;

  const transformedProducts = useMemo(() => 
    products.map(p => {
      // 根据产品类型找到在types数组中的索引
      const typeIndex = types.indexOf(p.type);
      // 获取对应位置的英文类型（如果存在）
      const englishType = typeIndex !== -1 && typeIndex < types_en.length 
        ? types_en[typeIndex] 
        : p.type; // 如果找不到对应的英文类型，使用中文类型作为后备
      
      return {
        id: p.id,
        name: p.name,
        oem: p.oem_no?.[0] || '', // 使用第一个OEM号
        category: lang === 'zh' ? p.type : englishType, // 根据语言选择类型
        // 直接使用name字段作为图片名称，使用固定URL
        imgUrl: 'https://ufi-aftermarket.com/wp-content/uploads/sites/4/2023/03/UFI_AMZ_Store_2022_Gamma_Olio.png'
      };
    })
  , [products, lang, types, types_en]);

  const filteredProducts = useMemo(() =>
    transformedProducts.filter(p => {
      const matchesFilter = filters.length === 0 || filters.includes(p.category);
      const matchesSearch = searchTerm === '' ||
        (searchType === 'name'
          ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
          : p.oem.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    })
  , [transformedProducts, searchType]);
  
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
                    <Link 
                      key={product.id}
                      href={`/detail/${product.id}?lang=${lang}`}
                      target="_blank"
                      textDecoration="none"
                      rel="noopener noreferrer"
                      focusRing="none"
                    >
                      <Box 
                        borderWidth="1px" 
                        p={4} 
                        borderRadius="xs"
                        boxShadow="sm"
                        _hover={{ 
                          boxShadow: 'md',
                          cursor: 'pointer'
                        }}
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
                    </Link>
                  )
                })}
              </Grid>

              {/* 分页器 */}
              {totalPages > 1 && (
                <Box mt={8} display="flex" justifyContent="center">
                  <Pagination.Root
                    count={filteredProducts.length}
                    pageSize={itemsPerPage}
                    page={currentPage}
                    onPageChange={(e) => setCurrentPage(e.page)}
                  >
                    <ButtonGroup variant="ghost" size="md">
                      <Pagination.PrevTrigger asChild>
                        <IconButton>
                          <LuChevronLeft />
                        </IconButton>
                      </Pagination.PrevTrigger>
                      
                      <Pagination.Items
                        render={(page) => (
                          <IconButton
                            variant={currentPage === page.value ? 'outline' : 'ghost'}
                            onClick={() => setCurrentPage(page.value)}
                            aria-label={`Page ${page.value}`}
                          >
                            {page.value}
                          </IconButton>
                        )}
                      />
                      
                      <Pagination.NextTrigger asChild>
                        <IconButton>
                          <LuChevronRight />
                        </IconButton>
                      </Pagination.NextTrigger>
                    </ButtonGroup>
                  </Pagination.Root>
                </Box>
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
