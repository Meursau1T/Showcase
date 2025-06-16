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

type TableValKey = 'oem_no' | 'manufacturer' | 'machine_model' | 'ref_no';
type StringValKey = Exclude<keyof ProductPrisma & string, TableValKey>

type TextEditProps = {
  item: Partial<ProductPrisma>
  keyName: StringValKey
  setItem: Function
}

const TextEdit = ({ item, keyName: key, setItem }: TextEditProps) => (
  <Input
    value={item[key] || ''}
    onChange={(e) => {
      setItem({ ...item, [key]: e.target.value })
    }}
  />
)

type TableInputProps = {
  keyName: TableValKey;
  item: Partial<ProductPrisma>
  setItem: Function;
  cols?: string[];
}

const TableInput = ({ keyName, item, setItem, cols }: TableInputProps) => {
  const [inputValue, setInputValue] = useState<ProductPrisma[TableValKey][0]>();
  const currentList = item[keyName] || []
  
  const handleAdd = () => {
    if (typeof inputValue === 'string') {
      const val = inputValue.trim()
      if (val) {
        setItem({
          ...item,
          [keyName]: [...currentList, val],
        })
        setInputValue('')
      }
    } else {
      const val = inputValue;
      if (val) {
        setItem({
          ...item,
          [keyName]: [...currentList, val],
        })
        setInputValue({} as typeof inputValue)
      }
    }
  }

  const handleDelete = (index: number) => {
    const updated = [...currentList]
    updated.splice(index, 1)
    setItem({ ...item, [keyName]: updated })
  }

  return (
    <Table.Root size="sm">
      <Table.Header>
      </Table.Header>
      <Table.Body>
        {currentList.map((val, index) => (
          <Table.Row key={index}>
            <Flex w="full">
              {typeof val === 'object' ?
                cols?.map(k => 
                  <Table.Cell w="50%">{val[k as keyof typeof val]}</Table.Cell> 
                ) :
                <Table.Cell>{val}</Table.Cell>
              }
            </Flex>
            <Table.Cell textAlign="end">
              <Button size="xs" colorScheme="red" onClick={() => handleDelete(index)}>
                删除
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell width="100%">
            {cols && cols.length > 1 ?
              <Flex gap="8">
                {cols.map(k => 
                  <Input
                    placeholder={k}
                    value={inputValue?.[k as keyof typeof inputValue] || ''}
                    onChange={(e) => setInputValue({ ...inputValue as ProductPrisma['ref_no'][0], [k]: e.target.value })}
                  />
                )}
              </Flex> :
              <Input
                value={inputValue as string}
                onChange={(e) => setInputValue(e.target.value)}
              />
            }
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
                    <TableInput keyName={'oem_no'} item={newItem} setItem={setNewItem} />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>REF.NO.</Field.Label>
                    <TableInput keyName={'ref_no'} item={newItem} setItem={setNewItem} cols={['brand', 'id']}/>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Machine Model</Field.Label>
                    <TableInput keyName={'machine_model'} item={newItem} setItem={setNewItem} />
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
