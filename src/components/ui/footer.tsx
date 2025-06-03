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
          <Flex align="center" mb={4}>
            <Box
              w="40px"
              h="40px"
              bg="white"
              mr={5}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* 品牌图标 */}
              <Image src="/path-to-ufi-logo.png" alt="UFI Logo" boxSize="30px" />
            </Box>
            <Text fontSize="24px" fontWeight="bold">
              UFI Aftermarket
            </Text>
          </Flex>
          <Text fontSize="16px" mb={2}>
            Headquarters: Via Europa, 26 - 46047 Porto Mantovano (MN) - Italia
          </Text>
          <Text fontSize="14px">Commercial Register: MN 215768</Text>
          <Text fontSize="14px">VAT Registration Number: 00221810237</Text>
        </GridItem>

        {/* 第二列：Support */}
        <GridItem>
          <Text fontSize="24px" fontWeight="bold" mb={4}>
            Support
          </Text>
          <Text fontSize="16px" mb={4}>
            For any information on the new catalog or our products, please contact UFI customer service.
          </Text>
          <Link
            color="teal.300"
            fontSize="18px"
            fontWeight="semibold"
            _hover={{ color: 'teal.400' }}
          >
            Contact us
          </Link>
        </GridItem>

        {/* 第三列：Online Catalog */}
        <GridItem>
          <Text fontSize="24px" fontWeight="bold" mb={4}>
            Online Catalog
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gapY={3} gapX={6}>
            <Link href="#" color="gray.300" fontSize="16px">Oil Filters</Link>
            <Link href="#" color="gray.300" fontSize="16px">Fuel Filters</Link>
            <Link href="#" color="gray.300" fontSize="16px">Air Filters</Link>
            <Link href="#" color="gray.300" fontSize="16px">Cabin Filters</Link>
            <Link href="#" color="gray.300" fontSize="16px">Other Filters</Link>
          </Grid>
        </GridItem>

        {/* 第四列：UFI Social */}
        <GridItem>
          <Text fontSize="24px" fontWeight="bold" mb={4}>
            UFI Social
          </Text>
          <Flex direction="column" gap={4}>
            <SocialLink href="#" icon="/fb.svg" label="Facebook" />
            <SocialLink href="#" icon="/wechat.svg" label="WeChat" />
          </Flex>
        </GridItem>
      </Grid>

      {/* 版权信息 */}
      <Box textAlign="center" mt={8} fontSize="sm" color="gray.400">
        © {currentYear} UFI Aftermarket. All rights reserved.
      </Box>
    </Box>
  );
};

const footerContent = {
  en: {
    companyName: 'UFI Aftermarket',
    headquarters: 'Headquarters: Via Europa, 26 - 46047 Porto Mantovano (MN) - Italia',
    commercialRegister: 'Commercial Register: MN 215768',
    vatNumber: 'VAT Registration Number: 00221810237',
    supportTitle: 'Support',
    supportText: 'For any information on the new catalog or our products, please contact UFI customer service.',
    contactUs: 'Contact us',
    catalogTitle: 'Online Catalog',
    oilFilters: 'Oil Filters',
    fuelFilters: 'Fuel Filters',
    airFilters: 'Air Filters',
    cabinFilters: 'Cabin Filters',
    otherFilters: 'Other Filters',
    socialTitle: 'UFI Social',
    copyright: (year: number) => `© ${year} UFI Aftermarket. All rights reserved.`,
  },
  zh: {
    companyName: 'UFI 售后市场',
    headquarters: '总部：意大利波河畔蒙特贝罗（MN）欧罗巴街 26 号',
    commercialRegister: '商业注册号：MN 215768',
    vatNumber: '增值税号：00221810237',
    supportTitle: '支持',
    supportText: '如需了解新产品目录或我们的产品信息，请联系 UFI 客户服务。',
    contactUs: '联系我们',
    catalogTitle: '在线产品目录',
    oilFilters: '机油滤清器',
    fuelFilters: '燃油滤清器',
    airFilters: '空气滤清器',
    cabinFilters: '空调滤清器',
    otherFilters: '其他滤清器',
    socialTitle: 'UFI 社交平台',
    copyright: (year: number) => `© ${year} UFI 售后市场。保留所有权利。`,
  },
};
