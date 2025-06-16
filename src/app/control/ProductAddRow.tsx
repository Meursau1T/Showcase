'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
  Portal,
  CloseButton,
  Input,
  Flex,
  Field,
  Table,
} from '@chakra-ui/react'
import { ProductPrisma } from '@/type'

type StringValKey = Exclude<keyof ProductPrisma & string, 'oem_no' | 'manufacturer' | 'machine_model' | 'ref_no'>

type TextEditProps = {
  item: Partial<ProductPrisma>
  keyName: StringValKey
  setItem: Function
}

const TextEdit = ({ item, keyName: key, setItem }: TextEditProps) => (
  <Input
    value={item[key] || ''}
    onChange={(e) => {
      console.log('dev wxf key', key);
      console.log('dev wxf set', { ...item, [key]: e.target.value });
      setItem({ ...item, [key]: e.target.value })
    }}
  />
)

export const ProductAddRow = () => {
  const [isOpen, setIsOpen] = useState(false)
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
  })

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const handleAdd = async () => {
    const res = await fetch('/api/product/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })

    if (res.ok) {
      alert('商品新增成功')
      onClose()
    }
  }

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => setIsOpen(e.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Dialog.Trigger asChild>
          <Button colorScheme="blue">添加商品</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              className="p-4 rounded-lg shadow-lg bg-white w-[400px]"
              style={{ width: 'fit-content' }}
            >
              <Dialog.Header>
                <Dialog.Title>添加商品</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Flex direction="column" gap={4}>
                  <Field.Root>
                    <Field.Label>名称</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} keyName="name" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>类型</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} keyName="type" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>HLW</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} keyName="hlw" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>制造商</Field.Label>
                    <Input
                      className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={
                        Array.isArray(newItem.manufacturer)
                          ? newItem.manufacturer.join(', ')
                          : newItem.manufacturer || ''
                      }
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          manufacturer: e.target.value.split(',').map((s) => s.trim()),
                        })
                      }
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>OEM编号</Field.Label>
                    <Table.Root size="sm">
                      <Table.Header>
                        <Table.Row>
                          <Table.ColumnHeader>品牌</Table.ColumnHeader>
                          <Table.ColumnHeader>编号</Table.ColumnHeader>
                          <Table.ColumnHeader textAlign="end">操作</Table.ColumnHeader>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {newItem.oem_no?.map((oem, index) => {
                          const [brand, productNo] = oem.split(':').map((s) => s.trim())
                          return (
                            <Table.Row key={index}>
                              <Table.Cell>{brand}</Table.Cell>
                              <Table.Cell>{productNo}</Table.Cell>
                              <Table.Cell textAlign="end">
                                <Button size="xs" colorScheme="red" onClick={() => {
                                  const updated = [...(newItem.oem_no || [])]
                                  updated.splice(index, 1)
                                  setNewItem({ ...newItem, oem_no: updated })
                                }}>
                                  删除
                                </Button>
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                        <Table.Row>
                          <Table.Cell>
                            <Input
                              placeholder="品牌"
                              onChange={(e) => {
                                const brand = e.target.value
                                const inputField = document.getElementById('product-oem-no-input')
                                if (inputField) {
                                  const [prevBrand, prevNo] = inputField.getAttribute('data-value') || ''
                                  inputField.setAttribute('data-value', `${brand}:${prevNo}`)
                                }
                              }}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Input
                              id="product-oem-no-input"
                              placeholder="编号"
                              data-value=""
                              onChange={(e) => {
                                const inputVal = e.target.value
                                const [brand, prevNo] = (e.target.getAttribute('data-value') || '').split(':')
                                e.target.setAttribute('data-value', `${brand || '品牌'}:${inputVal}`)
                              }}
                            />
                          </Table.Cell>
                          <Table.Cell textAlign="end">
                            <Button
                              size="xs"
                              colorScheme="green"
                              onClick={() => {
                                const inputField = document.getElementById('product-oem-no-input')
                                const value = inputField?.getAttribute('data-value') || ''
                                const [brand, productNo] = value.split(':').map((s) => s.trim())
                                if (brand && productNo) {
                                  setNewItem({
                                    ...newItem,
                                    oem_no: [...(newItem.oem_no || []), `${brand}:${productNo}`],
                                  })
                                  inputField?.setAttribute('data-value', '')
                                  // inputField?.previousElementSibling?.querySelector('input')?.value = ''
                                }
                              }}
                            >
                              添加
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table.Root>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>参考编号（品牌:编号）</Field.Label>
                    <Input
                      className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={
                        Array.isArray(newItem.ref_no)
                          ? newItem.ref_no
                              .map((ref) => `${ref.brand}:${ref.product_no}`)
                              .join(',')
                          : newItem.ref_no || ''
                      }
                      onChange={(e) => {
                        const input = e.target.value
                        const parsed = input
                          .split(',')
                          .map((s) => s.trim())
                          .filter((s) => s)
                          .map((s) => {
                            const [brand, product_no] = s.split(':').map((part) => part.trim())
                            return { brand, product_no }
                          })
                        setNewItem({
                          ...newItem,
                          ref_no: parsed,
                        })
                      }}
                      placeholder="品牌:编号"
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>机型</Field.Label>
                    <Input
                      className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={
                        Array.isArray(newItem.machine_model)
                          ? newItem.machine_model.join(', ')
                          : newItem.machine_model || ''
                      }
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          machine_model: e.target.value.split(',').map((s) => s.trim()),
                        })
                      }
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Cu M³</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} keyName="cu_m3" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>描述</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} keyName="desc_app" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>价格</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} keyName="price" />
                  </Field.Root>

                  <Button colorScheme="green" onClick={handleAdd}>
                    保存
                  </Button>
                </Flex>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
