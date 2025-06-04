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
      {/* 四列布局 */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
        gap={{ base: '12', md: '0' }}
        justifyContent="space-between"
        alignItems="start"
      >
        {/* 第一列：公司信息 */}
        <GridItem>
          <Text fontSize="24px" fontWeight="bold">
            {footerContent[locale].companyName}
          </Text>
          <Text fontSize="16px" mb={2}>
            {footerContent[locale].headquarters}
          </Text>
          <Text fontSize="14px">{footerContent[locale].commercialRegister}</Text>
          <Text fontSize="14px">{footerContent[locale].vatNumber}</Text>
        </GridItem>

        {/* 第二列：Support */}
        <GridItem>
          <Text fontSize="24px" fontWeight="bold" mb={4}>
            {footerContent[locale].supportTitle}
          </Text>
          <Text fontSize="16px" mb={4}>
            {footerContent[locale].supportText}
          </Text>
          <Link
            color="teal.300"
            fontSize="18px"
            fontWeight="semibold"
            _hover={{ color: 'teal.400' }}
          >
            {footerContent[locale].contactUs}
          </Link>
        </GridItem>


        {/* 第四列：UFI Social */}
        <GridItem>
          <Text fontSize="24px" fontWeight="bold" mb={4}>
            {footerContent[locale].socialTitle}
          </Text>
          <Flex direction="column" gap={4}>
            <SocialLink href="#" icon="/fb.svg" label="Facebook" />
            <SocialLink href="#" icon="/wechat.svg" label="WeChat" />
          </Flex>
        </GridItem>
      </Grid>

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
    commercialRegister: 'Phone: 0769-82208192 82208193',
    vatNumber: 'Fax: 0769-82208190',
    supportTitle: 'Support',
    supportText: 'For any information on the new catalog or our products, please contact UFI customer service.',
    contactUs: 'Contact us',
    socialTitle: 'Social',
    copyright: (year: number) => `© ${year} Dongguan Yuming Filter Products Co., Ltd. All rights reserved.`,
  },
  zh: {
    companyName: '东莞市钰铭滤清器制品有限公司',
    headquarters: '地址: 广东省东莞市东城区下桥工业园M栋',
    phoneNumber: '电话: 0769-82208192 82208193',
    faxNumber: '传真: 0769-82208190',
    contact: '联系人: 宋先生',
    postal: '邮编: 523466'
    email: '邮箱: song761214@163.com'
    socialTitle: '社交平台',
    copyright: (year: number) => `版权所有 © ${year} 东莞市钰铭滤清器制品有限公司`,
  },
};
