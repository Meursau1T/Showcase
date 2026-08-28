import { Box } from '@chakra-ui/react'
import htmr from 'htmr'
import React from 'react'
import SlideBanner from './slider'

interface CommonDetailProps {
    backgroundImage?: string // 背景图片URL
    imageText?: string // 背景图片中的文本
    textContent?: string // 可选文本内容
    imageContent?: string // 可选图片内容URL
}

export const CommonDetail: React.FC<CommonDetailProps> = ({
    backgroundImage,
    imageText,
    textContent,
    imageContent,
}) => {
    // 提取内容渲染逻辑到变量
    let contentElement: React.ReactNode = null
    if (textContent) {
        contentElement = (
            <Box p="72px">
                <div className="htmr-content">{htmr(textContent)}</div>
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
            {backgroundImage && <SlideBanner src={backgroundImage} text={imageText} />}
            {/* 内容区域 */}
            {contentElement}
        </Box>
    )
}
