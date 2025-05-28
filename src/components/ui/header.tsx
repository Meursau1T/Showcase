'use client'

import { 
  Box, 
  Flex, 
  Button, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem 
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
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
      name: { zh: '产品中心', en: 'Products' }, 
      path: '/products' 
    },
    {
      name: { zh: '品牌专栏', en: 'Brand' },
      subItems: [
        { name: { zh: '公司简介', en: 'Company Profile' }, path: '/brand/profile' },
        { name: { zh: '企业文化', en: 'Corporate Culture' }, path: '/brand/culture' },
        { name: { zh: '组织架构', en: 'Organization' }, path: '/brand/structure' },
        { name: { zh: '公司专利', en: 'Patents' }, path: '/brand/patents' }
      ]
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
          'path' in item ? (
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
          ) : (
            <Menu key={item.name[locale]} isLazy>
              <MenuButton
                as={Button}
                variant="ghost"
                colorScheme="blue"
                rightIcon={<ChevronDownIcon />}
                mx={2}
                _hover={{ bg: 'gray.100' }}
                _expanded={{ bg: 'gray.200' }}
              >
                {item.name[locale]}
              </MenuButton>
              <MenuList minW="200px" boxShadow="xl">
                {item.subItems.map((subItem) => (
                  <Link key={subItem.path} href={subItem.path} passHref>
                    <MenuItem 
                      py={2}
                      _hover={{ bg: 'blue.50', color: 'blue.600' }}
                    >
                      {subItem.name[locale]}
                    </MenuItem>
                  </Link>
                ))}
              </MenuList>
            </Menu>
          )
        ))}
      </Flex>
    </Box>
  );
}
