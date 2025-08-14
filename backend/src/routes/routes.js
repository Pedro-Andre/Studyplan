import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

// GET All Users
async function getUsers() {
  const users = await prisma.user.findMany();
  console.log(users);
}

getUsers();
