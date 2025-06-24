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
    <Table.Row key={localData.id}>
      <Table.Cell>
        <Input
          minW="100px"
          value={localData.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          minW="100px"
          value={localData.type || ''}
          onChange={(e) => handleChange('type', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          minW="100px"
          value={localData.hlw || ''}
          onChange={(e) => handleChange('hlw', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          minW="100px"
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
          minW="100px"
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
        {
          localData.ref_no.map((ref, index) => (
            <Table.Row key={ref.product_no + ref.brand}>
              <Table.Cell>
                <Input
                  minW="100px"
                  value={ref.brand}
                  onChange={(e) => {
                    const updatedRefNo = [...localData.ref_no];
                    updatedRefNo[index] = {
                      ...updatedRefNo[index],
                      brand: e.target.value,
                    };
                    handleChange('ref_no', updatedRefNo);
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  minW="100px"
                  value={ref.product_no}
                  onChange={(e) => {
                    const updatedRefNo = [...localData.ref_no];
                    updatedRefNo[index] = {
                      ...updatedRefNo[index],
                      product_no: e.target.value,
                    };
                    handleChange('ref_no', updatedRefNo);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Cell>
      <Table.Cell>
        <Input
          minW="100px"
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
          minW="100px"
          value={localData.cu_m3 || ''}
          onChange={(e) => handleChange('cu_m3', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          minW="100px"
          value={localData.desc_app || ''}
          onChange={(e) => handleChange('desc_app', e.target.value)}
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          minW="100px"
          value={localData.price || ''}
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
    <Table.Row key={localData.id}>
      <Table.Cell>{localData.name}</Table.Cell>
      <Table.Cell>{localData.type}</Table.Cell>
      <Table.Cell>{localData.hlw}</Table.Cell>
      <Table.Cell>
        {
          localData.manufacturer.map((item) => (
            <Table.Row key={item}>
              <Table.Cell>{item}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Cell>
      <Table.Cell>
        {
          localData.oem_no.map((item) => (
            <Table.Row key={item}>
              <Table.Cell>{item}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Cell>
      <Table.Cell>
        {
          localData.ref_no.map(item => (
            <Table.Row key={item.product_no + item.brand}>
              <Table.Cell>{item.brand}</Table.Cell>
              <Table.Cell>{item.product_no}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Cell>
      <Table.Cell>
        {
          localData.machine_model.map(item => (
            <Table.Row key={item}>
              <Table.Cell>{item}</Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Cell>
      <Table.Cell>{localData.cu_m3}</Table.Cell>
      <Table.Cell>{localData.desc_app}</Table.Cell>
      <Table.Cell>{localData.price}</Table.Cell>
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
