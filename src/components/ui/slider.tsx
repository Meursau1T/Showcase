'use client'

import React from 'react'
import { Image, Box, Text } from '@chakra-ui/react'
import { Carousel } from 'antd'

const contentStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: '600px',
    objectFit: 'fill',
}

export default function SlideBanner({ src, text }: { src: string; text?: string }) {
    const srcList = src.split('|')
    if (srcList.length === 1) {
        return (
            <Box
                w="full"
                h="auto"
                bg="gray.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                position="relative"
            >
                <Image src={srcList[0]} alt="Banner" h="100%" w="100%" />
                {text && (
                    <Box position="absolute" inset="0" display="flex" alignItems="center" justifyContent="center">
                        <Text
                            maxW="50%"
                            color="white"
                            fontSize="72px"
                            fontWeight={700}
                            textShadow="0 2px 6px rgba(0, 0, 0, 0.35)"
                            textAlign="center"
                            whiteSpace="pre-wrap"
                            overflowWrap="anywhere"
                        >
                            {text}
                        </Text>
                    </Box>
                )}
            </Box>
        )
    } else if (srcList.length > 1) {
        return (
            <Box w="full" h="auto" position="relative">
                <Carousel arrows autoplay draggable>
                    {srcList.map((item, index) => (
                        <div key={index}>
                            <Image style={contentStyle} src={item} alt={`Banner ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
                {text && (
                    <Box
                        position="absolute"
                        inset="0"
                        zIndex={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        pointerEvents="none"
                    >
                        <Text
                            maxW="50%"
                            color="white"
                            fontSize="72px"
                            fontWeight={700}
                            textShadow="0 2px 6px rgba(0, 0, 0, 0.35)"
                            textAlign="center"
                            whiteSpace="pre-wrap"
                            overflowWrap="anywhere"
                        >
                            {text}
                        </Text>
                    </Box>
                )}
            </Box>
        )
    }
}
