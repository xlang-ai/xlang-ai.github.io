const { PrismaClient } = require("@prisma/client");
const example = require("./example.json");

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

  for (const item of example) {
    console.log("Feed item into database")
    await prisma.user.create({
        data: {
            email: item.email,
            name: item.name
        }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
