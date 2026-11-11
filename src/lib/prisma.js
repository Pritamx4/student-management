import "dotenv/config";
import {PrismaBetterSqlite3} from "@prisma/adapter-better-sqlite3";
import {PrismaClient} from "@prisma/client";
const globalForPrisma = globalThis;
const prismaClientSingleton = ()=>{
    const adapter = new PrismaBetterSqlite3({
        url: process.env.DATABASE_URL,
    });
    return new PrismaClient({
        adapter,
    });
}

export const prisma = globalForPrisma.prisma || prismaClientSingleton();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

