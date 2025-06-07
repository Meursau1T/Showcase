'use client'

import { useState } from 'react'
import { Box, Heading, Table, Input, Button, Flex } from '@chakra-ui/react'
import { ProductPrisma } from '@/type'

interface Props {
  data: ProductPrisma[] | null;
}

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

export default function ProductEditor({ data: serverData }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [localData, setLocalData] = useState<Record<number, ProductPrisma>>({});
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

  const handleEdit = (item: ProductPrisma) => {
    setEditingId(item.id);
    setLocalData({
      ...localData,
      [item.id]: { ...item },
    });
  };

  const handleSave = async (id: number) => {
    const item = localData[id];
    const res = await fetch('/api/product/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (res.ok) {
      setEditingId(null);
      // 可选：刷新 serverData 或更新状态
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

  const handleChange = (id: number, field: keyof ProductPrisma, value: any) => {
    setLocalData({
      ...localData,
      [id]: {
        ...localData[id],
        [field]: value,
      },
    });
  };

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
            {/* 新增/编辑行 */}
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

            {/* 数据行 */}
            {serverData?.map((item) => {
              const isEditing = editingId === item.id;
              const currentData = localData[item.id] || item;

              return (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={currentData.name || ''}
                        onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                      />
                    ) : (
                      item.name
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={currentData.type || ''}
                        onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                      />
                    ) : (
                      item.type
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={currentData.hlw || ''}
                        onChange={(e) => handleChange(item.id, 'hlw', e.target.value)}
                      />
                    ) : (
                      item.hlw
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={
                          Array.isArray(currentData.manufacturer)
                            ? currentData.manufacturer.join(', ')
                            : currentData.manufacturer || ''
                        }
                        onChange={(e) =>
                          handleChange(
                            item.id,
                            'manufacturer',
                            e.target.value.split(',').map((s) => s.trim())
                          )
                        }
                      />
                    ) : (
                      Array.isArray(item.manufacturer)
                        ? item.manufacturer.join(', ')
                        : item.manufacturer
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={
                          Array.isArray(currentData.oem_no)
                            ? currentData.oem_no.join(', ')
                            : currentData.oem_no || ''
                        }
                        onChange={(e) =>
                          handleChange(
                            item.id,
                            'oem_no',
                            e.target.value.split(',').map((s) => s.trim())
                          )
                        }
                      />
                    ) : (
                      currentData.oem_no.map((item) => (
                        <Table.Row key={item}>
                          <Table.Cell>{item}</Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={
                          Array.isArray(currentData.ref_no)
                            ? currentData.ref_no
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

                          handleChange(item.id, 'ref_no', parsed);
                        }}
                      />
                    ) : (
                      item.ref_no.map(item => (
                        <Table.Row key={item.product_no + item.brand}>
                          <Table.Cell>{item.brand}</Table.Cell>
                          <Table.Cell>{item.product_no}</Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={
                          Array.isArray(currentData.machine_model)
                            ? currentData.machine_model.join(', ')
                            : currentData.machine_model || ''
                        }
                        onChange={(e) =>
                          handleChange(
                            item.id,
                            'machine_model',
                            e.target.value.split(',').map((s) => s.trim())
                          )
                        }
                      />
                    ) : (
                      item.machine_model.map(item => (
                        <Table.Row key={item}>
                          <Table.Cell>{item}</Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={currentData.cu_m3 || ''}
                        onChange={(e) => handleChange(item.id, 'cu_m3', e.target.value)}
                      />
                    ) : (
                      item.cu_m3
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={currentData.desc_app || ''}
                        onChange={(e) => handleChange(item.id, 'desc_app', e.target.value)}
                      />
                    ) : (
                      item.desc_app
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isEditing ? (
                      <Input
                        value={currentData.price || ''}
                        onChange={(e) => handleChange(item.id, 'price', e.target.value)}
                      />
                    ) : (
                      item.price
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Flex gap={2} direction="column">
                      {isEditing ? (
                        <>
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => handleSave(item.id)}
                          >
                            保存
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="gray"
                            onClick={() => setEditingId(null)}
                          >
                            取消
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                            onClick={() => handleEdit(item)}
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
                      )}
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
}
