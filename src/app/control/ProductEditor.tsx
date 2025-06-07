'use client'

import { useState } from 'react'
import { Box, Heading, Table, Input, Button } from '@chakra-ui/react'
import { ProductPrisma } from '@/type'

interface Props {
  data: ProductPrisma[] | null;
}

export default function ProductEditor({ data: serverData }: Props) {
  const [data, setData] = useState<ProductPrisma>();

  const handleSubmit = async () => {
    const res = await fetch('/api/product/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    })

    if (res.ok) {
      alert('商品信息更新成功')
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>商品编辑</Heading>
        <Table.Root size={'sm'}>
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
            {/* {items.map((item) => ( */}
            {/*   <Table.Row key={item.id}> */}
            {/*     <Table.Cell>{item.name}</Table.Cell> */}
            {/*     <Table.Cell>{item.category}</Table.Cell> */}
            {/*     <Table.Cell textAlign="end">{item.price}</Table.Cell> */}
            {/*   </Table.Row> */}
            {/* ))} */}
          </Table.Body>
        </Table.Root>
    </Box>
  )
}
