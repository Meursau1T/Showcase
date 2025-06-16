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
        size="cover"
      >
        <Dialog.Trigger asChild>
          <Button colorScheme="blue">添加商品</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className="p-4 rounded-lg shadow-lg bg-white w-[400px]">
              <Dialog.Header>
                <Dialog.Title>添加商品</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Flex direction="column" gap={4}>
                  <Field.Root>
                    <Field.Label>YM.NO</Field.Label>
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
                    <Field.Label>Manufacture</Field.Label>
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
                    <Field.Label>O.E.M.NO</Field.Label>
                    <Table.Root size="sm">
                      <Table.Root size="sm">
                        <Table.Header>
                        </Table.Header>
                        <Table.Body>
                          {newItem.oem_no?.map((oem, index) => {
                            const [productNo] = oem.split(':').map((s) => s.trim())
                            return (
                              <Table.Row key={index}>
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
                                id="product-oem-no-input"
                                placeholder="编号"
                                data-value=""
                                onChange={(e) => {
                                  const inputVal = e.target.value
                                  e.target.setAttribute('data-value', inputVal)
                                }}
                              />
                            </Table.Cell>
                            <Table.Cell textAlign="end">
                              <Button
                                size="xs"
                                colorScheme="green"
                                onClick={() => {
                                  const inputField = document.getElementById('product-oem-no-input')
                                  const productNo = inputField?.getAttribute('data-value')?.trim()
                                  if (productNo) {
                                    setNewItem({
                                      ...newItem,
                                      oem_no: [...(newItem.oem_no || []), productNo],
                                    })
                                    inputField?.setAttribute('data-value', '')
                                  }
                                }}
                              >
                                添加
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table.Root>
                    </Table.Root>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>REF.NO.</Field.Label>
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
                    <Field.Label>Machine Model</Field.Label>
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
                    <Field.Label>Cu.M3</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} keyName="cu_m3" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} keyName="desc_app" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Price</Field.Label>
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
