import { PrismaClient, Material } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma = new PrismaClient()

type ResponseData = {
  materiales?: Material[];
  material?: Material;
  newMaterial?: Material;
  message?: String;
}

const materialsApi = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  try {

    if (req.method === 'GET') {
      const materiales = await prisma.material.findMany();
      return res.status(200).json({ materiales });
    }

    if (req.method === 'POST') {
      console.log(req.body);
      // const {id, name, quantity, userId } = req.body;

      let {nombre, saldo, creadoPor, fechaCreacion } = req.body;
      if (typeof saldo === 'string') saldo = Number(saldo);
      const newMaterial = await prisma.material.create({
        data: {
          name: nombre,
          quantity: saldo,
          createdAt: fechaCreacion,
          userId: creadoPor,
        }
      });

      return res.status(201).json({ newMaterial });
    }

    if (req.method === 'PUT') {
      const materialId = req.query.id as string;

      const updateMaterial = await prisma.material.update({
        where: {
          id: materialId,
        },
        data: {
          name: req.body.name,
          quantity: req.body.quantity,
          userId: req.body.userId
        }
      });

      return res.status(200).json({ material: updateMaterial });
    }

    if (req.method === 'DELETE') {
      const materialId = req.query.id as string;

      const deleteMaterial = await prisma.material.delete({
        where: {
          id: materialId,
        }
      });

      return res.status(200).json({ material: deleteMaterial });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.log('******* Error *******',error)
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default materialsApi
