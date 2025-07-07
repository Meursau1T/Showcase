'use client'

import { useState } from 'react'
import { Box, Heading, Flex, Text, Input, Button } from '@chakra-ui/react'
import type { MainPrisma } from '@/type'

interface Props {
  data: MainPrisma | null;
}
const defautNewProduct = {
  image: '',
  title: { zh: '', en: '' },
  description: { zh: '', en: '' },
  url: ''
}

export default function MainPageEditor(props: Props) {
  const [banner, setBanner] = useState(props.data?.banner || '')
  const [currList, setCurrList] = useState(props.data?.products || [])
  const [newProduct, setNewProduct] = useState<MainPrisma['products'][0]>(defautNewProduct)
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const isValidProduct = (product: typeof newProduct) => {
    return (
      product.title.zh.trim() !== '' &&
      product.title.en.trim() !== '' &&
      product.image.trim() !== '' &&
      product.description.zh.trim() !== '' &&
      product.description.en.trim() !== '' &&
      product.url.trim() !== ''
    )
  }

  const handleSubmit = async () => {
    const res = await fetch('/api/main/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        banner,
        products: currList,           // 新增：提交 currList
        current: props.data?.banner,
      }),
    })

    if (res.ok) {
      setIsSuccess(true)
      setMessage('首页数据更新成功')
    } else {
      setIsSuccess(false)
      const result = await res.json()
      setMessage(result.error || '更新失败')
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
      <Heading size="2xl" mb={4}>首页编辑 - Banner</Heading>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={2}>
          <Text fontWeight="bold">Banner 地址</Text>
          <Input
            value={banner}
            onChange={(e) => {
              setMessage(null);
              setBanner(e.target.value);
            }}
            placeholder="输入 Banner 地址"
          />
        </Flex>
        
        {/* 种类编辑模块 */}
        <Heading size="md" mt={6} mb={4}>种类编辑</Heading>

        <Flex direction="column" gap={3}>
          {/* 已有种类列表 */}
          {currList.map((product, index) => (
            <>
              <Text w="80px" fontSize="md">{product.title.zh}</Text>
              <Flex key={index} gap={3} alignItems="center" flexWrap="wrap">
                {/* 中文标题 */}
                <Flex align="center" gap={2} minW="200px">
                  <Text w="80px" fontSize="sm">中文名称</Text>
                  <Input
                    value={product.title.zh}
                    onChange={(e) => {
                      const newProducts = [...currList];
                      newProducts[index].title.zh = e.target.value;
                      setCurrList(newProducts);
                    }}
                  />
                </Flex>

                {/* 英文标题 */}
                <Flex align="center" gap={2} minW="200px">
                  <Text w="80px" fontSize="sm">英文名称</Text>
                  <Input
                    value={product.title.en}
                    placeholder="英文名称"
                    onChange={(e) => {
                      const newProducts = [...currList];
                      newProducts[index].title.en = e.target.value;
                      setCurrList(newProducts);
                    }}
                  />
                </Flex>

                {/* 图片地址 */}
                <Flex align="center" gap={2} minW="200px">
                  <Text w="80px" fontSize="sm">图片地址</Text>
                  <Input
                    value={product.image}
                    placeholder="图片地址"
                    onChange={(e) => {
                      const newProducts = [...currList];
                      newProducts[index].image = e.target.value;
                      setCurrList(newProducts);
                    }}
                  />
                </Flex>

                {/* 中文描述 */}
                <Flex align="center" gap={2} minW="200px">
                  <Text w="80px" fontSize="sm">中文描述</Text>
                  <Input
                    value={product.description.zh}
                    placeholder="中文描述"
                    onChange={(e) => {
                      const newProducts = [...currList];
                      newProducts[index].description.zh = e.target.value;
                      setCurrList(newProducts);
                    }}
                  />
                </Flex>

                {/* 英文描述 */}
                <Flex align="center" gap={2} minW="200px">
                  <Text w="80px" fontSize="sm">英文描述</Text>
                  <Input
                    value={product.description.en}
                    placeholder="英文描述"
                    onChange={(e) => {
                      const newProducts = [...currList];
                      newProducts[index].description.en = e.target.value;
                      setCurrList(newProducts);
                    }}
                  />
                </Flex>

                {/* 链接地址 */}
                <Flex align="center" gap={2} minW="200px">
                  <Text w="80px" fontSize="sm">链接地址</Text>
                  <Input
                    value={product.url}
                    placeholder="链接地址"
                    onChange={(e) => {
                      const newProducts = [...currList];
                      newProducts[index].url = e.target.value;
                      setCurrList(newProducts);
                    }}
                  />
                </Flex>
              </Flex>
            </>
          ))}
          {/* 种类编辑模块 */}
          <Heading size="sm" mt={6} mb={4}>新增种类</Heading>
          {/* 空行 + 添加按钮 */}
          <Flex gap={3} alignItems="center" flexWrap="wrap">
            <Input
              placeholder="新种类名称（中文）"
              width="200px"
              value={newProduct.title.zh}
              onChange={(e) => {
                setNewProduct({
                  ...newProduct,
                  title: { ...newProduct.title, zh: e.target.value }
                })
              }}
            />
            <Input
              placeholder="新种类名称（英文）"
              width="200px"
              value={newProduct.title.en}
              onChange={(e) => {
                setNewProduct({
                  ...newProduct,
                  title: { ...newProduct.title, en: e.target.value }
                })
              }}
            />
            <Input
              placeholder="图片地址"
              value={newProduct.image}
              onChange={(e) => {
                setNewProduct({ ...newProduct, image: e.target.value })
              }}
            />
            <Input
              placeholder="中文描述"
              value={newProduct.description.zh}
              onChange={(e) => {
                setNewProduct({
                  ...newProduct,
                  description: { ...newProduct.description, zh: e.target.value }
                })
              }}
            />
            <Input
              placeholder="英文描述"
              value={newProduct.description.en}
              onChange={(e) => {
                setNewProduct({
                  ...newProduct,
                  description: { ...newProduct.description, en: e.target.value }
                })
              }}
            />
            <Input
              placeholder="链接地址"
              value={newProduct.url}
              onChange={(e) => {
                setNewProduct({ ...newProduct, url: e.target.value })
              }}
            />
            <Button
              colorScheme="green"
              size="sm"
              ml="auto"
              onClick={() => {
                if (isValidProduct(newProduct)) {
                  setCurrList([...currList, newProduct])
                  setNewProduct(defautNewProduct)
                } else {
                  alert('请填写所有字段')
                }
              }}
            >
              添加
            </Button>
          </Flex>
        </Flex>

        <Flex align="center" gap={3}>
          <Button colorScheme="blue" onClick={handleSubmit}>
            保存
          </Button>
          {message && (
            <Text color={isSuccess ? 'green.500' : 'red.500'} fontSize="sm">
              {message}
            </Text>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
