import { Box, Heading, Table, Flex, Pagination, IconButton, ButtonGroup } from '@chakra-ui/react'
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

  const filteredData = serverData || []
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
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
    '操作',
  ]

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Flex justifyContent={'space-between'}>
        <Heading size="2xl" mb={4}>商品编辑</Heading>
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
    </Box>

    <Box mt={4} display="flex" justifyContent="center">
      <Pagination.Root
        count={totalPages}
        pageSize={1}
        defaultPage={currentPage}
        onChange={(page) => setCurrentPage(page)}
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
  );
}
