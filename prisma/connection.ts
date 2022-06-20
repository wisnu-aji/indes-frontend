import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

process.stdin.resume(); //so the program will not close instantly

async function exitHandler() {
  prisma.$disconnect();
  process.exit();
}

//do something when app is closing
process.on("exit", exitHandler);

//catches ctrl+c event
process.on("SIGINT", exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler);
process.on("SIGUSR2", exitHandler);

//catches uncaught exceptions
process.on("uncaughtException", exitHandler);
