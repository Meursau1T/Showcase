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
  keyName: StringValKey
}

type TableInputProps<T extends TableValKey> = {
  keyName: T;
  item: Partial<ProductPrisma>
  setItem: Function;
}

type DataDisplayProps<T extends TableValKey> = {
  currentList: Partial<ProductPrisma>[T],
  keyName: T,
  handleDelete: (idx: number) => void,
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

/** 单行多输入框组件 */
const multiInputLine = <T extends ProductPrisma[MultiInputKey][0]>(
  value: T,
  keyName: MultiInputKey,
  setInputValue: Function
) => (
  <Flex gap="8" w="full">
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
const DataDisplay = <T extends TableValKey>({ keyName, currentList, handleDelete }: DataDisplayProps<T>) => {
  const RemoveButton = ({ index }: { index: number }) => (
    <Table.Cell textAlign="end">
      <Button size="xs" colorScheme="red" onClick={() => handleDelete(index)}>
        删除
      </Button>
    </Table.Cell>
  )
  if (isRefNoList(keyName, currentList)) {
    return currentList?.map((val, index) => (
      <Table.Row key={index} w="full">
        <Flex w="full">
          {(Object.keys(val) as (keyof typeof val)[])?.map(k => 
            <Table.Cell w="50%">{val[k]}</Table.Cell> 
          )}
        </Flex>
        <RemoveButton index={index} />
      </Table.Row>
    ))
  } else if (isStringList(keyName, currentList)) {
    return currentList?.map((val, index) => (
      <Table.Row key={index} w="full">
        <Flex w="full">
          <Table.Cell>{val}</Table.Cell>
        </Flex>
        <RemoveButton index={index} />
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
        <DataDisplay currentList={currentList} keyName={keyName} handleDelete={handleDelete} />
        <Table.Row>
          <Table.Cell width="100%">
            {keyName in multiInputKeyConf ?
              <Flex gap="8" w="full">{multiInputKeyConf[keyName]?.renderInput()}</Flex> :
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

type ProductEditModalProps = {
  buttonText: string;
  defaultItem: Partial<ProductPrisma>;
  onSave?: (item: Partial<ProductPrisma>) => Promise<void>;
}

export const ProductEditModal = ({ buttonText, defaultItem, onSave }: ProductEditModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [item, setItem] = useState<Partial<ProductPrisma>>(defaultItem)

  /** 基础文本输入框封装 */
  const TextEdit = useCallback(({ keyName: key }: TextEditProps) => (
    <Input
      value={item[key] || ''}
      onChange={(e) => {
        setItem({ ...item, [key]: e.target.value })
      }}
    />
  ), [item, setItem])

  const fieldsConfig = [
    { key: 'name', label: 'YM.NO', component: <TextEdit keyName="name" /> },
    { key: 'type', label: '类型', component: <TextEdit keyName="type" /> },
    { key: 'hlw', label: 'HLW', component: <TextEdit keyName="hlw" /> },
    {
      key: 'manufacturer',
      label: 'Manufacture',
      component: <TableInput keyName="manufacturer" setItem={setItem} item={item} />
    },
    {
      key: 'oem_no',
      label: 'O.E.M.NO',
      component: <TableInput keyName="oem_no" setItem={setItem} item={item} />
    },
    {
      key: 'ref_no',
      label: 'REF.NO.',
      component: <TableInput keyName="ref_no" setItem={setItem} item={item} />
    },
    {
      key: 'machine_model',
      label: 'Machine Model',
      component: <TableInput keyName="machine_model" setItem={setItem} item={item} />
    },
    { key: 'cu_m3', label: 'CU.M3', component: <TextEdit keyName="cu_m3" /> },
    { key: 'desc_app', label: 'Description', component: <TextEdit keyName="desc_app" /> },
    { key: 'price', label: 'Price', component: <TextEdit keyName="price" /> },
  ] satisfies { key: keyof ProductPrisma, label: string, component: React.ReactNode }[]

  const handleSave = async () => {
    if (onSave) {
      await onSave(item)
      setIsOpen(false)
    }
  }

  return (
    <>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e.open)
          if (!e.open) {
            setItem(defaultItem)
          }
        }}
        placement="center"
        motionPreset="slide-in-bottom"
        size="cover"
      >
        <Dialog.Trigger asChild>
          <Button colorScheme="blue">{buttonText}</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className="p-4 rounded-lg shadow-lg bg-white w-[400px]">
              <Dialog.Header>
                <Dialog.Title>{buttonText}</Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Flex direction="column" gap={4}>
                  {fieldsConfig.map((field) => (
                    <Field.Root key={field.key}>
                      <Field.Label>{field.label}</Field.Label>
                      {field.component}
                    </Field.Root>
                  ))}

                  <Button colorScheme="green" onClick={handleSave}>
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
