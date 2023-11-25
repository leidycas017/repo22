import { PrismaClient, InventoryMovement } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient()

type ResponseData = {
  inventoryMovements?: InventoryMovement[];
  inventoryMovement?: InventoryMovement;
  newInventoryMovement?: InventoryMovement;
  message?: String;
}

const inventoryMovementsApi = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {

    if (req.method === 'GET') {
      const inventoryMovements = await prisma.inventoryMovement.findMany();
      return res.status(200).json({ inventoryMovements });
    }

    if (req.method === 'POST') {
      const { movementType, quantity, materialId, userId } = req.body;

      const newInventoryMovement = await prisma.inventoryMovement.create({
        data: {
          movementType,
          quantity,
          materialId,
          userId
        }
      });

      return res.status(201).json({ newInventoryMovement });
    }

    if (req.method === 'PUT') {
      const inventoryMovementId = req.query.id as string;

      const updateInventoryMovement = await prisma.inventoryMovement.update({
        where: {
          id: inventoryMovementId,
        },
        data: {
          movementType: req.body.movementType,
          quantity: req.body.quantity,
          materialId: req.body.materialId,
          userId: req.body.userId
        }
      });

      return res.status(200).json({ inventoryMovement: updateInventoryMovement });
    }

    if (req.method === 'DELETE') {
      const inventoryMovementId = req.query.id as string;

      const deleteInventoryMovement = await prisma.inventoryMovement.delete({
        where: {
          id: inventoryMovementId,
        }
      });

      return res.status(200).json({ inventoryMovement: deleteInventoryMovement });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default inventoryMovementsApi
