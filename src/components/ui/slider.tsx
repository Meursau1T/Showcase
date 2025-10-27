'use client'

import React from 'react'
import { Image, Box } from '@chakra-ui/react'
import { Carousel } from 'antd'

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
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
                        <Image style={contentStyle} key={index} src={item} />
                    ))}
                </Carousel>
            </div>
        )
    }
}
