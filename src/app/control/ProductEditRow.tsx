'use client'

import type { ProductPrisma } from "@/type";
import { Table, Flex, Button } from '@chakra-ui/react';
import { ProductEditModal } from "./ProductEditModal";

interface Props {
  item: ProductPrisma;
}

export const ProductEditRow = ({ item }: Props) => {
  const handleSave = async (item: ProductPrisma) => {
    const res = await fetch('/api/product/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
  };

  return (
    <Table.Row key={item.id}>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.type}</Table.Cell>
      <Table.Cell>{item.hlw}</Table.Cell>
      <Table.Cell>
        {
          item.manufacturer.map((item) => (
            <Table.Row key={item}>
              <Table.Cell>{item}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Cell>
      <Table.Cell>
        {
          item.oem_no.map((item) => (
            <Table.Row key={item}>
              <Table.Cell>{item}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Cell>
      <Table.Cell>
        {
          item.ref_no.map(item => (
            <Table.Row key={item.product_no + item.brand}>
              <Table.Cell>{item.brand}</Table.Cell>
              <Table.Cell>{item.product_no}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Cell>
      <Table.Cell>
        {
          item.machine_model.map(item => (
            <Table.Row key={item}>
              <Table.Cell>{item}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Cell>
      <Table.Cell>{item.cu_m3}</Table.Cell>
      <Table.Cell>{item.desc_app}</Table.Cell>
      <Table.Cell>{item.price}</Table.Cell>
      <Table.Cell>
        <Flex gap={2} direction="column">
          <>
            <ProductEditModal defaultItem={item} buttonText={'编辑'} />
            <Button size="sm" colorScheme="red">
              删除
            </Button>
          </>
        </Flex>
      </Table.Cell>
    </Table.Row>
  )
}
