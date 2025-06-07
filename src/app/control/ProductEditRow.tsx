'use client'

import type { ProductPrisma } from "@/type";
import { Table, Flex, Button, Input } from '@chakra-ui/react';
import { useState } from "react";

interface Props {
  item: ProductPrisma;
}

export const ProductEditRow = ({ item }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState<ProductPrisma>({...item});

  const handleChange = (field: keyof ProductPrisma, value: any) => {
    setLocalData({ ...localData, [field]: value});
  }

  const handleSave = async () => {
    const res = await fetch('/api/product/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(localData),
    });

    if (res.ok) {
      setIsEditing(false);
    }
  };

  const editingEl = (
    <Table.Row key={item.id}>
      <Table.Cell>
        <Input
          value={item.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={item.type || ''}
          onChange={(e) => handleChange('type', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={item.hlw || ''}
          onChange={(e) => handleChange('hlw', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={
            Array.isArray(item.manufacturer)
              ? item.manufacturer.join(', ')
              : item.manufacturer || ''
          }
          onChange={(e) =>
            handleChange(
              'manufacturer',
              e.target.value.split(',').map((s) => s.trim())
            )
          }
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={
            Array.isArray(item.oem_no)
              ? item.oem_no.join(', ')
              : item.oem_no || ''
          }
          onChange={(e) =>
            handleChange(
              'oem_no',
              e.target.value.split(',').map((s) => s.trim())
            )
          }
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={
            Array.isArray(item.ref_no)
              ? item.ref_no
                  .map((ref) => `${ref.brand}:${ref.product_no}`)
                  .join(',')
              : ''
          }
          onChange={(e) => {
            const input = e.target.value;
            const parsed = input
              .split(',')
              .map((s) => s.trim())
              .filter((s) => s)
              .map((s) => {
                const [brand, product_no] = s
                  .split(':')
                  .map((part) => part.trim());
                return { brand, product_no };
              });

            handleChange('ref_no', parsed);
          }}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={
            Array.isArray(item.machine_model)
              ? item.machine_model.join(', ')
              : item.machine_model || ''
          }
          onChange={(e) =>
            handleChange(
              'machine_model',
              e.target.value.split(',').map((s) => s.trim())
            )
          }
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={item.cu_m3 || ''}
          onChange={(e) => handleChange('cu_m3', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={item.desc_app || ''}
          onChange={(e) => handleChange('desc_app', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={item.price || ''}
          onChange={(e) => handleChange('price', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2} direction="column">
          <>
            <Button
              size="sm"
              colorScheme="green"
              onClick={() => handleSave()}
            >
              保存
            </Button>
            <Button
              size="sm"
              colorScheme="gray"
              onClick={() => setIsEditing(false)}
            >
              取消
            </Button>
          </>
        </Flex>
      </Table.Cell>
    </Table.Row>
  );

  const notEditingEl = (
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
            <Button
              size="sm"
              colorScheme="blue"
              variant="outline"
              onClick={() => setIsEditing(true)}
            >
              编辑
            </Button>
            <Button size="sm" colorScheme="teal" variant="outline">
              修改图片
            </Button>
            <Button size="sm" colorScheme="red">
              删除
            </Button>
          </>
        </Flex>
      </Table.Cell>
    </Table.Row>
  )

  return isEditing ? editingEl : notEditingEl;
}
