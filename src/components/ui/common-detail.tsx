import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';

interface CommonDetailProps {
  backgroundImage: string; // 背景图片URL
  textContent?: string;    // 可选文本内容
  imageContent?: string;   // 可选图片内容URL
}

export const CommonDetail: React.FC<CommonDetailProps> = ({
  backgroundImage,
  textContent,
  imageContent
}) => {
  // 提取内容渲染逻辑到变量
  let contentElement: React.ReactNode = null;
  
  if (textContent) {
    contentElement = (
      <Text fontSize="lg" p="72px" className="whitespace-pre-line">
        {textContent}
      </Text>
    );
  } else if (imageContent) {
    contentElement = (
      <Box p="72px">
        <img 
          src={imageContent} 
          alt="Content" 
          className="max-w-full h-auto"
        />
      </Box>
    );
  }

  return (
    <Box className="flex flex-col w-full">
      {/* 背景图片区域 */}
      <Box 
        w="full" 
        h="300px" 
        bg="gray.100" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Image src="/test_banner.jpg" alt="Banner" maxH="100%" w="100vw"/>
      </Box>
      
      {/* 内容区域 */}
      {contentElement}
    </Box>
  );
};
