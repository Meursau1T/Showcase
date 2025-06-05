import { PrismaClient } from '@/generated/prisma';
import type { JsonValue } from '@prisma/client/runtime/client';

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/** obj1中是否包含obj2定义的所有key */
function containsAllKeys(obj1: Record<string, any>, obj2: Record<string, any>): boolean {
  // 遍历 obj2 的所有 key
  for (const key in obj2) {
    if (!Object.hasOwn(obj1, key)) {
      // obj1 中缺少某个 key
      return false;
    }

    // 如果值是对象且不是 null，则递归检查子对象
    if (typeof obj2[key] === 'object' && obj2[key] !== null && typeof obj1[key] === 'object' && obj1[key] !== null) {
      if (!containsAllKeys(obj1[key], obj2[key])) {
        return false;
      }
    }
  }

  return true;
}

const parseJsonValue = <T extends Record<string, any>>(data: JsonValue | undefined, defaultVal: T): T => {
  if (!data || typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    return defaultVal;
  }

  if (typeof defaultVal === 'object' && defaultVal !== null && !containsAllKeys(data, defaultVal)) {
    return defaultVal;
  }

  return data as T;
}

export { prisma, parseJsonValue };
