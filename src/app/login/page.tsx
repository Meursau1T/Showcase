import { Box, Flex, Input, Button, Text } from '@chakra-ui/react';
import { PageParam } from '@/type';
import { parseLang } from '@/utils';

export default async function LoginPage({ searchParams }: PageParam) {
  const lang = await parseLang(searchParams);
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center" bg="gray.100">
      <Box bg="white" p={6} borderRadius="md" shadow="md" w="400px">
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          登录
        </Text>
        <Flex direction="column" gap={3}>
          <Input placeholder="用户名" />
          <Input placeholder="密码" type="password" />
          <Button colorScheme="blue" mt={2}>
            登录
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
