import { prisma } from "@/services/prisma";
import { checkPrivateApi } from "@/utils/checkServerSession";
import { User} from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


interface Response {
    user?:User;
    message?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  await checkPrivateApi(req, res);
  
  if (req.method === 'PUT') {
    const idUsuario = req.query.id as string;
    const { email, roleId } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: idUsuario,
      },
      data: {
        email,
        roleId,
      },
    });

    return res.status(200).json({ user: updatedUser });
  }

    if(req.method == 'DELETE'){
       const idUsuario = req.query.id as string;
       await prisma.user.delete({
          where: {
            id: idUsuario,
          },
       });
       return res.status(200).json({message: 'User deleted'});
    }

    return res.status(405).json({message: 'Method not allowed'});
};

export default handler;