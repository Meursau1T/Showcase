'use client'

import { useState } from 'react'
import { Box, Heading, Table, Input, Button, Flex } from '@chakra-ui/react'
import { ProductPrisma } from '@/type'

interface Props {
  data: ProductPrisma[] | null;
}

export default function ProductEditor({ data: serverData }: Props) {
  const [data, setData] = useState<ProductPrisma>();
  const [newItem, setNewItem] = useState<Partial<ProductPrisma>>({
    name: '',
    type: '',
    hlw: '',
    manufacturer: [],
    oem_no: [],
    ref_no: { brandList: [], no_list: [] },
    machine_model: [],
    cu_m3: '',
    desc_app: '',
    price: '',
  });

  const handleSubmit = async () => {
    const res = await fetch('/api/product/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    })

    if (res.ok) {
      alert('商品信息更新成功')
    }
  };

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
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>商品编辑</Heading>
      <Table.Root size="sm">
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
          {/* 新增/编辑行 */}
          <Table.Row>
            <Table.Cell>
              <Input
                value={newItem.name || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={newItem.type || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, type: e.target.value })
                }
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={newItem.hlw || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, hlw: e.target.value })
                }
              />
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
                  Array.isArray(newItem.ref_no?.no_list)
                    ? newItem.ref_no.no_list.join(', ')
                    : newItem.ref_no?.no_list || ''
                }
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    ref_no: {
                      ...newItem.ref_no,
                      no_list: e.target.value
                        .split(',')
                        .map((s) => s.trim()),
                    },
                  })
                }
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
              <Input
                value={newItem.cu_m3 || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, cu_m3: e.target.value })
                }
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={newItem.desc_app || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, desc_app: e.target.value })
                }
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                value={newItem.price || ''}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
              />
            </Table.Cell>
            <Table.Cell>
              <Flex gap={2}>
                <Button size="sm" colorScheme="green" onClick={handleAdd}>
                  新增
                </Button>
                <Button size="sm" colorScheme="blue">
                  编辑图片
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>

          {/* 数据行 */}
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
                    编辑
                  </Button>
                  <Button size="sm" colorScheme="red">
                    删除
                  </Button>
                  <Button size="sm" colorScheme="teal">
                    编辑图片
                  </Button>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
