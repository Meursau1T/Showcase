import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  Grid,
  GridItem,
  Image,
} from '@chakra-ui/react';

type SocialLinkProps = {
  href: string;
  icon: string;
  label: string;
}

type Footer = {
  locale: 'zh' | 'en';
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <Link href={href} display="flex" /**align="center" */color="gray.300">
      <Image src={icon} alt={label} boxSize="24px" mr={3} />
      <Text fontSize="16px">{label}</Text>
    </Link>
  );
};


export const Footer = async ({ locale }: Footer) => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      className="w-full py-12 text-white"
      backgroundImage="url(https://ufi-aftermarket.com/wp-content/uploads/2018/03/bg-footer.jpg)"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      bgColor="#003366"
      color="white"
      px={{ base: '6', md: '36' }}
    >
      {/* 三列 Flex 布局 */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '8', md: '0' }}
        justifyContent="space-between"
        alignItems="start"
        wrap="nowrap"
      >
        {/* 第一列：公司信息 */}
        <Flex
          direction="column"
          minW={{ md: '250px' }}
        >
          <Text fontSize="24px" fontWeight="bold">
            {footerContent[locale].companyName}
          </Text>
          <Text fontSize="16px" mb={2}>
            {footerContent[locale].headquarters}
          </Text>
        </Flex>

        {/* 第二列：联系方式 */}
        <Flex direction="column" minW={{ md: '200px' }}>
          <Text fontSize="24px" fontWeight="bold" mb={4}>
            Contact Info
          </Text>
          <Flex direction="row" justifyContent="space-between">
            <Flex direction="column" gap={2} flex="1">
              <Text fontSize="14px">{footerContent[locale].phoneNumber}</Text>
              <Text fontSize="14px">{footerContent[locale].faxNumber}</Text>
              <Text fontSize="14px">{footerContent[locale].contact}</Text>
            </Flex>
            <Flex direction="column" gap={2} flex="1">
              <Text fontSize="14px">{footerContent[locale].postal}</Text>
              <Text fontSize="14px">{footerContent[locale].email}</Text>
              <Text fontSize="14px">{footerContent[locale].wechat}</Text>
            </Flex>
          </Flex>
        </Flex>

      </Flex>

      {/* 版权信息 */}
      <Box textAlign="center" mt={8} fontSize="sm" color="gray.400">
        {footerContent[locale].copyright(currentYear)}
      </Box>
    </Box>
  );
};

const footerContent = {
  en: {
    companyName: 'Dongguan Yuming Filter Products Co., Ltd.',
    headquarters: 'Address: Building M, Xiaqiao Industrial Park, Dongcheng District, Dongguan City, Guangdong Province',
    phoneNumber: 'Phone: 0769-82208192 82208193',
    faxNumber: 'Fax: 0769-82208190',
    contact: 'Contact: Mr. Song',
    postal: 'Postal Code: 523466',
    email: 'Email: song761214@163.com',
    wechat: 'WeChat: example_wechat_id',
    socialTitle: 'Social',
    copyright: (year: number) => `© ${year} Dongguan Yuming Filter Products Co., Ltd. All rights reserved.`,
  },
  zh: {
    companyName: '东莞市钰铭滤清器制品有限公司',
    headquarters: '地址: 广东省东莞市东城区下桥工业园M栋',
    phoneNumber: '电话: 0769-82208192 82208193',
    faxNumber: '传真: 0769-82208190',
    contact: '联系人: 宋先生',
    postal: '邮编: 523466',
    email: '邮箱: song761214@163.com',
    wechat: '微信: example_wechat_id',
    socialTitle: '社交平台',
    copyright: (year: number) => `版权所有 © ${year} 东莞市钰铭滤清器制品有限公司`,
  },
};
