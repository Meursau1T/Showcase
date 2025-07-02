'use client'

import { 
  Box, 
  Flex, 
  Button, 
  Menu, 
  Portal,
  Image
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type HeaderProps = {
  locale: 'zh' | 'en';
  isLogin: boolean;
}

const isActivePath = (pathname: string, item: ReturnType<typeof navItems>[0]) => {
  if ('path' in item) {
    return pathname === item.path;
  }
  if ('subItems' in item) {
    return item.subItems.some(subItem => pathname.startsWith(subItem.path));
  }
  return false;
};

const navItems = ({ langCb }: { langCb: Function }) => [
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
    path: '/brand'
  },
  {
    name: { zh: '关于我们', en: 'About' },
    subItems: [
      { name: { zh: '公司简介', en: 'Company Profile' }, path: '/about/profile' },
      { name: { zh: '企业文化', en: 'Corporate Culture' }, path: '/about/culture' },
      { name: { zh: '组织架构', en: 'Organization' }, path: '/about/structure' },
      { name: { zh: '公司专利', en: 'Patents' }, path: '/about/patents' }
    ]
  },
  {
    name: { zh: '语言', en: 'Lang' },
    subItems: [
      {
        name: { zh: '中文', en: '中文' },
        path: `?lang=zh`,
        onClick: () => handleLangChange('zh')
      },
      {
        name: { zh: 'English', en: 'English' },
        path: '?lang=en',
        onClick: () => handleLangChange('en')
      },
    ],
  },
  {
    name: { zh: '管理', en: 'Control' },
    path: '/control',
    auth: true
  }
];

type ItemProp = {
  item: ReturnType<typeof navItems>[0];
  pathname: string;
  activeColor: string;
  locale: HeaderProps['locale'];
}

const NormalItem = ({ item, pathname, activeColor, locale }: ItemProp) => (
  <Link 
    key={item.path} 
    href={item.path as 'string'} 
    passHref
    className={isActivePath(pathname, item) ? "" : "opacity-70 hover:opacity-100"}
  >
    <Button
      variant="plain"
      color={isActivePath(pathname, item) ? activeColor : 'inherit'}
      fontWeight={isActivePath(pathname, item) ? 'semibold' : 'normal'}
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
        className={isActivePath(pathname, item) ? "" : "opacity-70 hover:opacity-100"}
        variant="plain"
        color={isActivePath(pathname, item) ? activeColor : 'inherit'}
        fontWeight={isActivePath(pathname, item) ? 'semibold' : 'normal'}
        mx={2}
      >
        {item.name[locale]}
      </Button>
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          {item.subItems && item.subItems.map((subItem) => (
            <Menu.Item
              key={subItem.path}
              value={subItem.name[locale]}
              onClick={(e: React.MouseEvent) => {
                // @ts-ignore
                if (typeof subItem.onClick !== 'undefined') {
                  e.preventDefault();
                // @ts-ignore
                  subItem.onClick();  // 调用自定义的 onClick
                }
                location.href = subItem.path;
              }}
            >
              {subItem.name[locale]}
            </Menu.Item>
          ))}
        </Menu.Content>
        {/* 语言切换菜单关闭后保持当前路径 */}
        {item.path.startsWith('?lang=') && (
          <input type="hidden" value={locale} />
        )}
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

export function Header(props: HeaderProps) {
  const [locale, setLocale] = useState(props.locale);
  const pathname = usePathname();
  const bg = 'white';
  const activeColor = 'var(--color-darkblue)';

  const handleLangChange = (newLang: 'zh' | 'en') => {
    // 读取当前所有 cookie
    const cookies = document.cookie
      .split('; ')
      .reduce<Record<string, string>>((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});

    // 更新 lang
    cookies.lang = newLang;

    // 重新构建 cookie 字符串，并设置过期时间等属性
    const cookieStrings = Object.entries(cookies).map(([key, value]) => {
      return `${key}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    });

    // 写回浏览器
    document.cookie = cookieStrings.join('; ');

    // 更新状态
    setLocale(newLang);
  };

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
      <Flex mx="auto" justify="space-between" align="center">
        <Link href="/" passHref>
          <Box 
            position="relative" 
            maxW="56px"
            minW="56px"
            flexShrink={0}
            marginLeft={"32px"}
          >
            <Image
              src="/logo.jpg"
              marginTop={'8px'}
              alt={locale === 'zh' ? '公司标志' : 'Company Logo'}
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Link>
        <Flex 
          px={4} 
          py={3} 
          justify="flex-end" 
          align="center"
        >
          {navItems({ langCb: setLocale})
            .filter(item => props.isLogin || !item.auth)
            .map((item) => (
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
      </Flex>
    </Box>
  );
}
