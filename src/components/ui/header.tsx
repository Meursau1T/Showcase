'use client'

import { Box, Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  locale: 'zh' | 'en';
}

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const bg = 'white';
  const activeColor = 'blue.500';

  const navItems = [
    { 
      name: { zh: '首页', en: 'Home' }, 
      path: '/' 
    },
    { 
      name: { zh: '产品中心', en: 'Products Center' }, 
      path: '/products' 
    },
    { 
      name: { zh: '品牌专栏', en: 'Brand' }, 
      path: '/brand' 
    },
    { 
      name: { zh: '关于我们', en: 'About' }, 
      path: '/about' 
    },
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
              {item.name[locale]}
            </Button>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}
