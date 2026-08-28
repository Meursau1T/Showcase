'use client'

import React from 'react'
import { Image, Box } from '@chakra-ui/react'
import { Carousel } from 'antd'

const contentStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: '600px',
    objectFit: 'fill',
}

export default function SlideBanner({ src }: { src: string }) {
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
                overflow={'hidden'}
            >
                <Image src={srcList[0]} alt="Banner" h="100%" w="100%" />
            </Box>
        )
    } else if (srcList.length > 1) {
        return (
            <div style={{ width: '100%', height: 'auto' }}>
                <Carousel arrows autoplay draggable>
                    {srcList.map((item, index) => (
                        <div key={index}>
                            <Image style={contentStyle} src={item} alt={`Banner ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </div>
        )
    }
}
