'use client';

import { useState } from 'react';
import { Box, Heading, Table, Flex, Pagination, IconButton, ButtonGroup, Input } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { ProductPrisma } from '@/type'
import { ProductEditRow } from './ProductEditRow';
import { ProductAdd } from './ProductAdd';

interface Props {
  data: ProductPrisma[] | null;
}

export default function ProductEditor({ data: serverData }: Props) {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = (serverData || []).filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const rowConf = [
    'YM.NO.',
    'Type',
    'HLW',
    'Manufacture',
    'O.E.M. NO.',
    'REF.NO.',
    'MACHINE MODEL',
    'CU.M3',
    'Desc Application',
    'Price',
    '中文描述',
    '英文描述',
    '操作',
  ]

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Flex justifyContent="space-between" alignItems="center" gap={4} mb={4} flexWrap="wrap">
        <Heading size="2xl">商品编辑</Heading>
        <Box flex="1" maxW="300px">
          <Input
            placeholder="搜索商品名称"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="md"
          />
        </Box>
        {/* 新增 */}
        <ProductAdd />
      </Flex>
      <Table.ScrollArea borderWidth="1px">
        <Table.Root size="sm" variant="outline" showColumnBorder className="whitespace-nowrap overflow-x-auto max-w-full">
          <Table.Header>
            <Table.Row>
              {rowConf.map(item => (
                <Table.ColumnHeader>{item}</Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentData.map((item) => (
              <ProductEditRow key={item.name} item={item} />
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination.Root
          count={filteredData.length}
          pageSize={10}
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
                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
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
    </Box>
  );
}
