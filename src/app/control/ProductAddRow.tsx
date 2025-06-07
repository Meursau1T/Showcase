'use client'

import { useState } from 'react'
import { Table, Input, Button, Flex } from '@chakra-ui/react'
import { ProductPrisma } from '@/type'
import { ProductEditRow } from './ProductEditRow';

type StringValKey = Exclude<keyof ProductPrisma & string, 'oem_no' | 'manufacturer' | 'machine_model' | 'ref_no'>;

type TextEditProps = {
  item: Partial<ProductPrisma>;
  key: StringValKey;
  setItem: Function;
}

const TextEdit = ({ item, key, setItem }: TextEditProps) => (
  <Input
    value={item[key] || ''}
    onChange={(e) =>
      setItem({ ...item, [key]: e.target.value })
    }
  />
)


export const ProductAddRow = () => {
  const [newItem, setNewItem] = useState<Partial<ProductPrisma>>({
    name: '',
    type: '',
    hlw: '',
    manufacturer: [],
    oem_no: [],
    ref_no: [],
    machine_model: [],
    cu_m3: '',
    desc_app: '',
    price: '',
  });

  const handleAdd = async () => {
    const res = await fetch('/api/product/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });

    if (res.ok) {
      alert('商品新增成功');
      // 可选：刷新页面或更新 serverData
    }
  };

  return (
    <Table.Row>
      <Table.Cell>
        <TextEdit item={newItem} setItem={setNewItem} key={'name'} />
      </Table.Cell>
      <Table.Cell>
        <TextEdit item={newItem} setItem={setNewItem} key={'type'} />
      </Table.Cell>
      <Table.Cell>
        <TextEdit item={newItem} setItem={setNewItem} key={'hlw'} />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={Array.isArray(newItem.manufacturer) ? newItem.manufacturer.join(', ') : newItem.manufacturer || ''}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              manufacturer: e.target.value.split(',').map((s) => s.trim()),
            })
          }
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={Array.isArray(newItem.oem_no) ? newItem.oem_no.join(', ') : newItem.oem_no || ''}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              oem_no: e.target.value.split(',').map((s) => s.trim()),
            })
          }
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={
            Array.isArray(newItem.ref_no)
              ? newItem.ref_no
                  .map((ref) => `${ref.brand}:${ref.product_no}`)
              .join(',')
              : newItem.ref_no || ''
          }
          onChange={(e) => {
            const input = e.target.value;
            const parsed = input
              .split(',')
              .map((s) => s.trim())
              .filter((s) => s)
              .map((s) => {
                const [brand, product_no] = s.split(':').map((part) => part.trim());
                return { brand, product_no };
              });
            setNewItem({
              ...newItem,
              ref_no: parsed,
            });
          }}
          placeholder="品牌:编号"
        />
      </Table.Cell>
      <Table.Cell>
        <Input
          value={
            Array.isArray(newItem.machine_model)
              ? newItem.machine_model.join(', ')
              : newItem.machine_model || ''
          }
          onChange={(e) =>
            setNewItem({
              ...newItem,
              machine_model: e.target.value
                .split(',')
                .map((s) => s.trim()),
            })
          }
        />
      </Table.Cell>
      <Table.Cell>
        <TextEdit item={newItem} setItem={setNewItem} key={'cu_m3'} />
      </Table.Cell>
      <Table.Cell>
        <TextEdit item={newItem} setItem={setNewItem} key={'desc_app'} />
      </Table.Cell>
      <Table.Cell>
        <TextEdit item={newItem} setItem={setNewItem} key={'price'} />
      </Table.Cell>
      <Table.Cell>
        <Flex gap={2} direction="column">
          <Button variant="outline" size="sm" colorScheme="green" onClick={handleAdd}>
            新增
          </Button>
          <Button variant="outline" size="sm" colorScheme="blue">
            编辑图片
          </Button>
        </Flex>
      </Table.Cell>
    </Table.Row>
  )
}
