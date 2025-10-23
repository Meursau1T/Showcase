import React, { useState, useEffect } from 'react'
import { Box, VStack, HStack, Text, Button, Input, Spinner, IconButton, Flex, Heading } from '@chakra-ui/react'
import { DeleteIcon, DownloadIcon, AttachmentIcon } from '@chakra-ui/icons'

const FileListPage = () => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [error, setError] = useState('')

    // 获取文件列表
    const fetchFiles = async () => {
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/file/list')
            if (!res.ok) {
                throw new Error('获取文件列表失败')
            }
            const data = await res.json()
            setFiles(data)
        } catch (err) {
            setError(err.message)
            console.log('错误: 获取文件列表失败', err)
        } finally {
            setLoading(false)
        }
    }

    // 删除文件
    const deleteFile = async (filename) => {
        try {
            const res = await fetch(`/api/file/delete?filename=${encodeURIComponent(filename)}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                throw new Error('删除文件失败')
            }

            console.log('成功: 文件删除成功', filename)

            // 刷新文件列表
            fetchFiles()
        } catch (err) {
            console.log('错误: 删除文件失败', err)
        }
    }

    // 上传文件
    const uploadFile = async () => {
        if (!selectedFile) {
            console.log('提示: 请选择要上传的文件')
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            const res = await fetch('/api/file/upload', {
                method: 'POST',
                body: formData,
            })

            if (!res.ok) {
                throw new Error('上传文件失败')
            }

            console.log('成功: 文件上传成功', selectedFile.name)

            setSelectedFile(null)
            // 清空文件输入框
            const fileInput = document.getElementById('file-input')
            if (fileInput) fileInput.value = ''

            // 刷新文件列表
            fetchFiles()
        } catch (err) {
            console.log('错误: 上传文件失败', err)
        } finally {
            setUploading(false)
        }
    }

    // 文件选择处理
    const handleFileSelect = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)
    }

    // 组件挂载时获取文件列表
    useEffect(() => {
        fetchFiles()
    }, [])

    return (
        <Box className="min-h-screen bg-gray-50 p-4">
            <Box maxW="4xl" mx="auto">
                {/* 页面标题 */}
                <Heading as="h1" size="lg" mb={6} className="text-gray-800">
                    文件管理
                </Heading>

                {/* 上传区域 */}
                <Box p={6} bg="white" borderRadius="md" boxShadow="sm" borderWidth="1px" mb={6}>
                    <VStack spacing={4}>
                        <Text fontSize="md" fontWeight="semibold">
                            上传文件
                        </Text>
                        <HStack spacing={4} w="full">
                            <Input id="file-input" type="file" onChange={handleFileSelect} className="flex-1" />
                            <Button
                                colorScheme="blue"
                                onClick={uploadFile}
                                isLoading={uploading}
                                loadingText="上传中..."
                                leftIcon={<AttachmentIcon />}
                                disabled={!selectedFile}
                            >
                                上传
                            </Button>
                        </HStack>
                    </VStack>
                </Box>

                {/* 错误提示 */}
                {error && (
                    <Box p={4} mb={4} bg="red.50" borderColor="red.200" borderWidth="1px" borderRadius="md">
                        <Text color="red.700" fontWeight="semibold">
                            错误：{error}
                        </Text>
                    </Box>
                )}

                {/* 文件列表 */}
                <Box p={6} bg="white" borderRadius="md" boxShadow="sm" borderWidth="1px">
                    <Flex justify="space-between" align="center" mb={4}>
                        <Text fontSize="md" fontWeight="semibold">
                            文件列表
                        </Text>
                        <Button size="sm" variant="outline" onClick={fetchFiles} isLoading={loading}>
                            刷新
                        </Button>
                    </Flex>

                    {loading ? (
                        <Flex justify="center" py={8}>
                            <Spinner size="lg" />
                        </Flex>
                    ) : files.length === 0 ? (
                        <Text textAlign="center" color="gray.500" py={8}>
                            暂无文件
                        </Text>
                    ) : (
                        <VStack spacing={2} align="stretch">
                            {files.map((file, index) => (
                                <Box
                                    key={index}
                                    p={3}
                                    borderWidth="1px"
                                    borderRadius="md"
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <Flex justify="space-between" align="center">
                                        <HStack spacing={3}>
                                            <DownloadIcon color="blue.500" />
                                            <Text fontSize="sm" className="break-all">
                                                {typeof file === 'string' ? file : file.name || file.filename}
                                            </Text>
                                            {file.size && (
                                                <Text fontSize="xs" color="gray.500">
                                                    ({(file.size / 1024).toFixed(1)} KB)
                                                </Text>
                                            )}
                                        </HStack>
                                        <IconButton
                                            size="sm"
                                            colorScheme="red"
                                            variant="ghost"
                                            icon={<DeleteIcon />}
                                            onClick={() =>
                                                deleteFile(typeof file === 'string' ? file : file.name || file.filename)
                                            }
                                            aria-label="删除文件"
                                            className="hover:bg-red-50"
                                        />
                                    </Flex>
                                </Box>
                            ))}
                        </VStack>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default FileListPage
