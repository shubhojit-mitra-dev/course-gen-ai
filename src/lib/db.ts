import Prisma from "@prisma/client";
import "server-only";

const { PrismaClient } = Prisma;

declare global {
    // eslint-disable-next-line no-var
    var cachedPrisma: Prisma.PrismaClient;
}

export let prisma: Prisma.PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}