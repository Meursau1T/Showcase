import { Box, Heading, Table } from '@chakra-ui/react'
import { ProductPrisma } from '@/type'
import { ProductEditRow } from './ProductEditRow';
import { ProductAddRow } from './ProductAddRow';

interface Props {
  data: ProductPrisma[] | null;
}

export default function ProductEditor({ data: serverData }: Props) {

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>商品编辑</Heading>
      <Table.ScrollArea borderWidth="1px">
        <Table.Root size="sm" variant="outline" showColumnBorder className="whitespace-nowrap overflow-x-auto max-w-full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>YM.NO.</Table.ColumnHeader>
              <Table.ColumnHeader>Type</Table.ColumnHeader>
              <Table.ColumnHeader>HLW</Table.ColumnHeader>
              <Table.ColumnHeader>Manufacture</Table.ColumnHeader>
              <Table.ColumnHeader>O.E.M. NO.</Table.ColumnHeader>
              <Table.ColumnHeader>REF.NO.</Table.ColumnHeader>
              <Table.ColumnHeader>MACHINE MODEL</Table.ColumnHeader>
              <Table.ColumnHeader>CU.M3</Table.ColumnHeader>
              <Table.ColumnHeader>Desc Application</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>操作</Table.ColumnHeader>
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
