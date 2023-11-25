const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function insertarRoles() {
  try {
    await prisma.Role.createMany({
      data: [
        { id: "ADMIN", name: 'ADMIN' },
        { id: "USER", name: 'USER' },
      ],
    });

    console.log('Roles insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertarRoles();