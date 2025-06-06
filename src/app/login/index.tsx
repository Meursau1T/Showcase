'use client'

import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Box, Flex, Input, Button, Text } from '@chakra-ui/react';

const textMap = {
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
};

type Props = {
  lang: 'zh' | 'en';
}

async function getHash(value: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default function LoginPage({ lang }: Props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const hashedPassword = await getHash(password);
      const response = await fetch(`/api/login?name=${encodeURIComponent(name)}&password=${hashedPassword}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '登录失败');
      }

      // 登录成功，跳转或处理 token
      window.location.href = '/control'; // 或根据实际业务处理

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
          {textMap[lang].title}
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={3}>
            <Input
              placeholder={textMap[lang].usernamePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder={textMap[lang].passwordPlaceholder}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Text color="red.500" fontSize="sm">{error || textMap[lang].error}</Text>
            )}
            <Button
              colorScheme="blue"
              mt={2}
              type="submit"
              loading={isLoading}
            >
              {textMap[lang].submitButton}
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
