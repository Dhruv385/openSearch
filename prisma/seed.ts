import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const roles = [
  { key: 'TENANT', name: 'Tenant' },
  { key: 'LANDLORD', name: 'Landlord' },
  { key: 'PROPERTY_MANAGER', name: 'Property Manager' },
  { key: 'ADMIN', name: 'Admin' },
  { key: 'SUPER_ADMIN', name: 'Super Admin' },
];

async function main() {
  for (const role of roles) {
    await prisma.role.upsert({
      where: { key: role.key },
      update: role,
      create: role,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
