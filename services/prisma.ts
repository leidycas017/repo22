import { PrismaClient } from '@prisma/client';

// Extend the global NodeJS namespace
declare global {
  var prisma: PrismaClient | undefined;
}

// Singleton function to get or create an instance of PrismaClient
const getPrismaClient = (): PrismaClient => {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  return global.prisma;
};

// Create or retrieve the singleton PrismaClient instance
const prisma = getPrismaClient();

export { prisma };
