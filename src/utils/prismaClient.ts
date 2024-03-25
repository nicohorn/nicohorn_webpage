import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

process.on('exit', async () => {
    await prisma.$disconnect();
});

export default prisma;