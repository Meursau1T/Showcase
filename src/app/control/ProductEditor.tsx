'use client'

import { useState } from 'react'
import { Box, Heading, Table, Input, Button, Flex } from '@chakra-ui/react'
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
            {serverData?.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
                <Table.Cell>{item.hlw}</Table.Cell>
                <Table.Cell>
                  {Array.isArray(item.manufacturer)
                    ? item.manufacturer.join(', ')
                    : item.manufacturer}
                </Table.Cell>
                <Table.Cell>
                  {Array.isArray(item.oem_no)
                    ? item.oem_no.join(', ')
                    : item.oem_no}
                </Table.Cell>
                <Table.Cell>
                  {Array.isArray(item.ref_no?.no_list)
                    ? item.ref_no.no_list.join(', ')
                    : item.ref_no?.no_list}
                </Table.Cell>
                <Table.Cell>
                  {Array.isArray(item.machine_model)
                    ? item.machine_model.join(', ')
                    : item.machine_model}
                </Table.Cell>
                <Table.Cell>{item.cu_m3}</Table.Cell>
                <Table.Cell>{item.desc_app}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>
                  <Flex gap={2}>
                    <Button size="sm" colorScheme="blue">
                      修改
                    </Button>
                    <Button size="sm" colorScheme="red">
                      删除
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
    </Box>
  )
}
