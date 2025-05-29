import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      <Box p="72px" fontSize="lg">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          // components={{
            // p: ({node, ...props}) => <Text mb={4} {...props} />,
            // h1: ({node, ...props}) => <Text as="h1" fontSize="2xl" fontWeight="bold" mb={4} {...props} />,
            // h2: ({node, ...props}) => <Text as="h2" fontSize="xl" fontWeight="bold" mb={3} {...props} />,
            // h3: ({node, ...props}) => <Text as="h3" fontSize="lg" fontWeight="semibold" mb={2} {...props} />,
            // ul: ({node, ...props}) => <Box as="ul" pl={6} mb={4} {...props} />,
            // ol: ({node, ...props}) => <Box as="ol" pl={6} mb={4} {...props} />,
            // li: ({node, ...props}) => <Box as="li" mb={2} {...props} />,
            // a: ({node, ...props}) => <Text as="a" color="blue.500" textDecoration="underline" {...props} />
          // }}
        >
          {textContent}
        </ReactMarkdown>
      </Box>
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
        <Image src={backgroundImage} alt="Banner" maxH="100%" w="100vw" objectFit="cover"/>
      </Box>
      
      {/* 内容区域 */}
      {contentElement}
    </Box>
  );
};
