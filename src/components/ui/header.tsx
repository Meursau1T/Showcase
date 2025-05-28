'use client'

import { 
  Box, 
  Flex, 
  Button, 
  Menu, 
  Portal
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeaderProps = {
  locale: 'zh' | 'en';
}

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

type ItemProp = {
  item: typeof navItems[0];
  pathname: string;
  activeColor: string;
  locale: HeaderProps['locale'];
}

const NormalItem = ({ item, pathname, activeColor, locale }: ItemProp) => (
  <Link key={item.path} href={item.path as 'string'} passHref>
    <Button
      variant="plain"
      colorScheme="blue"
      color={pathname === item.path ? activeColor : 'inherit'}
      fontWeight={pathname === item.path ? 'semibold' : 'normal'}
      mx={2}
    >
      {item.name[locale]}
    </Button>
  </Link>
)

const DropDownItem = ({ item, pathname, locale, activeColor }: ItemProp) => (
  <Menu.Root key={item.name[locale]}>
    <Menu.Trigger asChild>
      <Button
        variant="plain"
        colorScheme="blue"
        color={pathname === item.path ? activeColor : 'inherit'}
        fontWeight={pathname === item.path ? 'semibold' : 'normal'}
        mx={2}
      >
        {item.name[locale]}
      </Button>
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          {item.subItems && item.subItems.map((subItem) => (
            <Link key={subItem.path} href={subItem.path} passHref>
              <Menu.Item value={subItem.name[locale]}>{subItem.name[locale]}</Menu.Item>
            </Link>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);

const UnionMenuItem = (props: ItemProp) => {
  if ('path' in props.item) {
    return <NormalItem {...props} />;
  } else {
    return <DropDownItem {...props} />;
  }
}

export function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const bg = 'white';
  const activeColor = 'blue.600';


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
          <UnionMenuItem
            key={item.name[locale]}
            {...{
              item,
              locale,
              activeColor,
              pathname,
            }}
          />))}
      </Flex>
    </Box>
  );
}
