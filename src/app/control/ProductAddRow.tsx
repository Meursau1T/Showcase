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
} from '@chakra-ui/react'
import { ProductPrisma } from '@/type'

type StringValKey = Exclude<keyof ProductPrisma & string, 'oem_no' | 'manufacturer' | 'machine_model' | 'ref_no'>

type TextEditProps = {
  item: Partial<ProductPrisma>
  key: StringValKey
  setItem: Function
}

const TextEdit = ({ item, key, setItem }: TextEditProps) => (
  <Input
    value={item[key] || ''}
    onChange={(e) => setItem({ ...item, [key]: e.target.value })}
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
                    <TextEdit item={newItem} setItem={setNewItem} key="name" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>类型</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} key="type" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>HLW</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} key="hlw" />
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
                    <Input
                      className="border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={
                        Array.isArray(newItem.oem_no)
                          ? newItem.oem_no.join(', ')
                          : newItem.oem_no || ''
                      }
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          oem_no: e.target.value.split(',').map((s) => s.trim()),
                        })
                      }
                    />
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
                    <TextEdit item={newItem} setItem={setNewItem} key="cu_m3" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>描述</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} key="desc_app" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>价格</Field.Label>
                    <TextEdit item={newItem} setItem={setNewItem} key="price" />
                  </Field.Root>

                  <Button colorScheme="green" onClick={handleAdd}>
                    保存
                  </Button>
                </Flex>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Popover.Root>
    </>
  )
}
