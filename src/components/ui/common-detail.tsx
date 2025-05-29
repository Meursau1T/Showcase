import { Box, Text } from '@chakra-ui/react';
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
      <Text fontSize="md" className="whitespace-pre-line">
        {textContent}
      </Text>
    );
  } else if (imageContent) {
    contentElement = (
      <img 
        src={imageContent} 
        alt="Content" 
        className="max-w-full h-auto"
      />
    );
  }

  return (
    <Box className="flex flex-col w-full">
      {/* 背景图片区域 */}
      <Box 
        className="w-full h-[300px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* 内容区域 */}
      <Box className="mt-8">
        {contentElement}
      </Box>
    </Box>
  );
};
