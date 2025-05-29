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
  return (
    <Box className="flex flex-col w-full">
      {/* 背景图片区域 */}
      <Box 
        className="w-full h-[300px] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* 内容区域 */}
      <Box className="mt-8">
        {textContent ? (
          // 有文本内容
          <Text fontSize="md" className="whitespace-pre-line">
            {textContent}
          </Text>
        ) : imageContent ? (
          // 只有图片内容
          <img 
            src={imageContent} 
            alt="Content" 
            className="max-w-full h-auto"
          />
        ) : null}
      </Box>
    </Box>
  );
};
