'use client'

import { useState, useCallback, ReactNode } from 'react'
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

type MultiInputKey = 'ref_no';

type StringValKey = Exclude<keyof ProductPrisma & string, TableValKey>

type KeyNameConf = {
  [K in MultiInputKey]?: {
    renderInput: () => ReactNode
  }
}

type TextEditProps = {
  item: Partial<ProductPrisma>
  keyName: StringValKey
  setItem: Function
}

type TableInputProps<T extends TableValKey> = {
  keyName: T;
  item: Partial<ProductPrisma>
  setItem: Function;
}

type DataDisplayProps<T extends TableValKey> = {
  currentList: Partial<ProductPrisma>[T],
  keyName: T,
  renderButton: () => ReactNode
}

const isRefNoList = (keyName: keyof ProductPrisma, val: unknown): val is ProductPrisma['ref_no'] =>
  keyName === 'ref_no'

const isStringList = (keyName: keyof ProductPrisma, val: unknown): val is string[] =>
  keyName === 'manufacturer' || keyName === 'oem_no' || keyName === 'machine_model'

const isRefNoVal = (keyName: keyof ProductPrisma, val: unknown): val is ProductPrisma['ref_no'][0] =>
  keyName === 'ref_no'

const isStringVal = (keyName: keyof ProductPrisma, val: unknown): val is string =>
  keyName === 'manufacturer' || keyName === 'oem_no' || keyName === 'machine_model'

const defaultTableValConf: { [K in TableValKey]: ProductPrisma[K][0] } = {
  ref_no: { brand: '', product_no: '' },
  machine_model: '',
  oem_no: '',
  manufacturer: ''
};

/** 基础文本输入框封装 */
const TextEdit = ({ item, keyName: key, setItem }: TextEditProps) => (
  <Input
    value={item[key] || ''}
    onChange={(e) => {
      setItem({ ...item, [key]: e.target.value })
    }}
  />
)

/** 单行多输入框组件 */
const multiInputLine = <T extends ProductPrisma[MultiInputKey][0]>(
  value: T,
  keyName: MultiInputKey,
  setInputValue: Function
) => (
  <Flex gap="8">
    {Object.keys(defaultTableValConf[keyName]).map(k => 
      <Input
        placeholder={k}
        value={value[k as keyof T] as string || ''}
        onChange={e =>
          setInputValue((val: any) => ({ ...(val || {}), [k]: e.target.value }))
        }
      />
    )}
  </Flex>
)

/**
  * 表格类型展示组件
  */
const DataDisplay = <T extends TableValKey>({ keyName, currentList, renderButton }: DataDisplayProps<T>) => {
  if (isRefNoList(keyName, currentList)) {
    return currentList?.map((val, index) => (
      <Table.Row key={index}>
        <Flex w="full">
          {(Object.keys(val) as (keyof typeof val)[])?.map(k => 
            <Table.Cell w="50%">{val[k]}</Table.Cell> 
          )}
        </Flex>
        {renderButton()}
      </Table.Row>
    ))
  } else if (isStringList(keyName, currentList)) {
    return currentList?.map((val, index) => (
      <Table.Row key={index}>
        <Flex w="full">
          <Table.Cell>{val}</Table.Cell>
        </Flex>
        {renderButton()}
      </Table.Row>
    ))
  }
}

/**
  * 表格类型输入组件
  */
const TableInput = <T extends TableValKey>({ keyName, item, setItem }: TableInputProps<T>) => {
  const [inputValue, setInputValue] = useState(defaultTableValConf[keyName as TableValKey] || '');
  const currentList = item[keyName] || []

  const multiInputKeyConf: KeyNameConf = {
    ref_no: {
      renderInput: () =>
        typeof inputValue !== 'string' &&
          multiInputLine(inputValue, 'ref_no', setInputValue),
    },
  }
  
  const handleAdd = () => {
    if (isStringVal(keyName, inputValue)) {
      const val = inputValue.trim()
      if (val) {
        setItem({
          ...item,
          [keyName]: [...currentList, val],
        })
        setInputValue('')
      }
    } else if (isRefNoVal(keyName, inputValue)){
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
              <DataDisplay
                currentList={currentList}
                keyName={keyName}
                renderButton={
                  () => (
                    <Table.Cell textAlign="end">
                      <Button size="xs" colorScheme="red" onClick={() => handleDelete(index)}>
                        删除
                      </Button>
                    </Table.Cell>
                  )
                }
              />
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
            {keyName in multiInputKeyConf ?
              <Flex gap="8">{multiInputKeyConf[keyName]?.renderInput()}</Flex> :
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

  const fieldsConfig = [
    { key: 'name' as const, label: 'YM.NO', component: <TextEdit item={newItem} setItem={setNewItem} keyName="name" /> },
    { key: 'type' as const, label: '类型', component: <TextEdit item={newItem} setItem={setNewItem} keyName="type" /> },
    { key: 'hlw' as const, label: 'HLW', component: <TextEdit item={newItem} setItem={setNewItem} keyName="hlw" /> },
    { key: 'manufacturer' as const, label: 'Manufacture', component: <TableInput keyName="manufacturer" item={newItem} setItem={setNewItem} /> },
    { key: 'oem_no' as const, label: 'O.E.M.NO', component: <TableInput keyName="oem_no" item={newItem} setItem={setNewItem} /> },
    { key: 'ref_no' as const, label: 'REF.NO.', component: <TableInput keyName="ref_no" item={newItem} setItem={setNewItem} /> },
    { key: 'machine_model' as const, label: 'Machine Model', component: <TableInput keyName="machine_model" item={newItem} setItem={setNewItem} /> },
    { key: 'cu_m3' as const, label: 'CU.M3', component: <TextEdit item={newItem} setItem={setNewItem} keyName="cu_m3" /> },
    { key: 'desc_app' as const, label: 'Description', component: <TextEdit item={newItem} setItem={setNewItem} keyName="desc_app" /> },
    { key: 'price' as const, label: 'Price', component: <TextEdit item={newItem} setItem={setNewItem} keyName="price" /> },
  ] satisfies { key: keyof ProductPrisma, label: string, component: React.ReactNode }[]


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
                    <TableInput keyName={'manufacturer'} item={newItem} setItem={setNewItem} />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>O.E.M.NO</Field.Label>
                    <TableInput keyName={'oem_no'} item={newItem} setItem={setNewItem} />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>REF.NO.</Field.Label>
                    <TableInput keyName={'ref_no'} item={newItem} setItem={setNewItem} />
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
