import { Box, Heading, Table } from '@chakra-ui/react'
import { ProductPrisma } from '@/type'
import { ProductEditRow } from './ProductEditRow';
import { ProductAddRow } from './ProductAddRow';

interface Props {
  data: ProductPrisma[] | null;
}

export default function ProductEditor({ data: serverData }: Props) {
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
      <Heading size="2xl" mb={4}>商品编辑</Heading>
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
            {/* 新增行 */}
            <ProductAddRow />
            {/* 数据行 */}
            {serverData?.map((item) => <ProductEditRow key={item.name} {...{item }} />)}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
}
