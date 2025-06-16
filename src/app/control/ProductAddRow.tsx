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

  const TableInput = () => {
    const [inputValue, setInputValue] = useState('')
    const currentList = newItem.oem_no || []

    const handleAdd = () => {
      const val = inputValue.trim()
      if (val) {
        setNewItem({
          ...newItem,
          oem_no: [...currentList, val],
        })
        setInputValue('')
      }
    }

    const handleDelete = (index: number) => {
      const updated = [...currentList]
      updated.splice(index, 1)
      setNewItem({ ...newItem, oem_no: updated })
    }

    return (
      <Table.Root size="sm">
        <Table.Body>
          {currentList.map((oem, index) => (
            <Table.Row key={index}>
              <Table.Cell>{oem}</Table.Cell>
              <Table.Cell textAlign="end">
                <Button size="xs" colorScheme="red" onClick={() => handleDelete(index)}>
                  删除
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell>
              <Input
                placeholder="编号"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Table.Cell>
            <Table.Cell textAlign="end">
              <Button size="xs" colorScheme="green" onClick={handleAdd}>
                添加
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    )
  }

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
                    <TableInput />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>REF.NO.</Field.Label>
                    <TableInput />
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
