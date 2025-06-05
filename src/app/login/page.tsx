'use client'

import { Box, Flex, Input, Button, Text, FormErrorMessage } from '@chakra-ui/react';
import { PageParam } from '@/type';
import { parseLang } from '@/utils';
import { useState } from 'react';

export default async function LoginPage({ searchParams }: PageParam) {
  const lang = await parseLang(searchParams);

  const t = {
    en: {
      title: 'Login',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      submitButton: 'Login',
      error: 'Invalid credentials',
    },
    zh: {
      title: '登录',
      usernamePlaceholder: '用户名',
      passwordPlaceholder: '密码',
      submitButton: '登录',
      error: '用户名或密码错误',
    },
  }[lang];

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 使用 crypto 或 bcrypt 等加密方式加密密码（此处为示例，使用 base64 编码模拟加密）
      const hashedPassword = btoa(password); // 实际应使用安全哈希算法如 bcrypt.js 或与后端一致的加密方式

      const response = await fetch(`/api/login?name=${encodeURIComponent(name)}&password=${encodeURIComponent(hashedPassword)}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '登录失败');
      }

      // 登录成功，跳转或处理 token
      window.location.href = '/'; // 或根据实际业务处理

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex h="100vh" justifyContent="center" alignItems="center" bg="gray.100">
      <Box bg="white" p={6} borderRadius="md" shadow="md" w="400px">
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          {t.title}
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={3}>
            <Input
              placeholder={t.usernamePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder={t.passwordPlaceholder}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <FormErrorMessage>
                <Text color="red.500" fontSize="sm">{error || t.error}</Text>
              </FormErrorMessage>
            )}
            <Button
              colorScheme="blue"
              mt={2}
              type="submit"
              isLoading={isLoading}
            >
              {t.submitButton}
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
