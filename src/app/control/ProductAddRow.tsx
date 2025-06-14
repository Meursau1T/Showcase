'use client'

import { useState } from 'react'
import {
  Button,
  Popover,
  Portal,
  Input,
  Flex,
  FormControl,
  FormLabel,
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
      <Popover.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Popover.Trigger asChild>
          <Button colorScheme="blue">添加商品</Button>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content
              className="p-4 rounded-lg shadow-lg bg-white w-[400px]"
              style={{ width: 'fit-content' }}
            >
              <Popover.Arrow />
              <Popover.Body>
                <Flex direction="column" gap={4}>
                  <FormControl>
                    <FormLabel>名称</FormLabel>
                    <TextEdit item={newItem} setItem={setNewItem} key="name" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>类型</FormLabel>
                    <TextEdit item={newItem} setItem={setNewItem} key="type" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>HLW</FormLabel>
                    <TextEdit item={newItem} setItem={setNewItem} key="hlw" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>制造商</FormLabel>
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
                  </FormControl>

                  <FormControl>
                    <FormLabel>OEM编号</FormLabel>
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
                  </FormControl>

                  <FormControl>
                    <FormLabel>参考编号（品牌:编号）</FormLabel>
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
                  </FormControl>

                  <FormControl>
                    <FormLabel>机型</FormLabel>
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
                  </FormControl>

                  <FormControl>
                    <FormLabel>Cu M³</FormLabel>
                    <TextEdit item={newItem} setItem={setNewItem} key="cu_m3" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>描述</FormLabel>
                    <TextEdit item={newItem} setItem={setNewItem} key="desc_app" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>价格</FormLabel>
                    <TextEdit item={newItem} setItem={setNewItem} key="price" />
                  </FormControl>

                  <Button colorScheme="green" onClick={handleAdd}>
                    保存
                  </Button>
                </Flex>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </>
  )
}
