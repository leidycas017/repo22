import { prisma } from "@/services/prisma";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { checkPrivateApi, checkProtectedApi } from "@/utils/checkServerSession";




type ResponseData = {
  users?: User[];
  user?: User;
  newUser?: User;
  message?: String;
}

const usersApi = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {

 await checkPrivateApi(req, res);
  

  try {

    if (req.method === 'GET') {
      const users = await prisma.user.findMany();
      return res.status(200).json({ users });
    }

    if (req.method === 'POST') {
      const { email, name, roleId } = req.body;
      const emailVerified = new Date().toISOString();

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          roleId,
          emailVerified,
        }
      });

      return res.status(201).json({ newUser });
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export default usersApi
