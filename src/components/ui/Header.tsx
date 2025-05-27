'use client';

import { Box, Flex, Button, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const bg = useColorModeValue('white', 'gray.800');
  const activeColor = useColorModeValue('blue.500', 'blue.200');

  const navItems = [
    { name: '首页', path: '/' },
    { name: '产品列表', path: '/products' },
    { name: '联系我们', path: '/contact' },
  ];

  return (
    <Box 
      as="header" 
      position="fixed" 
      top="0" 
      left="0" 
      right="0" 
      zIndex="sticky"
      bg={bg}
      boxShadow="sm"
      width="100%"
    >
      <Flex 
        maxW="container.xl" 
        mx="auto" 
        px={4} 
        py={3} 
        justify="flex-end" 
        align="center"
      >
        {navItems.map((item) => (
          <Link key={item.path} href={item.path} passHref>
            <Button
              variant="ghost"
              colorScheme="blue"
              color={pathname === item.path ? activeColor : 'inherit'}
              fontWeight={pathname === item.path ? 'semibold' : 'normal'}
              mx={2}
            >
              {item.name}
            </Button>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}
