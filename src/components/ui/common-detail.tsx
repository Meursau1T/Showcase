import { Box, Text, Image } from '@chakra-ui/react'
import htmr from 'htmr'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface CommonDetailProps {
    backgroundImage?: string // 背景图片URL
    textContent?: string // 可选文本内容
    imageContent?: string // 可选图片内容URL
}

export const CommonDetail: React.FC<CommonDetailProps> = ({ backgroundImage, textContent, imageContent }) => {
    // 提取内容渲染逻辑到变量
    let contentElement: React.ReactNode = null
    if (textContent) {
        contentElement = (
            <Box p="72px" fontSize="lg">
                {htmr(textContent)}
            </Box>
        )
    } else if (imageContent) {
        contentElement = (
            <Box p="72px">
                <img src={imageContent} alt="Content" className="max-w-full h-auto" />
            </Box>
        )
    }

    return (
        <Box className="flex flex-col w-full">
            {/* 背景图片区域 */}
            {backgroundImage && (
                <Box w="full" h="300px" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                    <Image src={backgroundImage} alt="Banner" maxH="100%" w="100vw" objectFit="cover" />
                </Box>
            )}
            {/* 内容区域 */}
            {contentElement}
        </Box>
    )
}
