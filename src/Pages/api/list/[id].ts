import { NextApiRequest, NextApiResponse } from "next";
import { getListById } from "../../../db/list";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (req.method !== "GET") {
      res.status(405).end();
      resolve();
    }

    try {
      const { id } = req.query;

      if (id) {
        const list = await getListById(id as string);
        res.status(200).json(list);
        resolve();
      }
    } catch (e) {
      reject(e);
    }

    resolve();
  });
}
