import { NextApiRequest, NextApiResponse } from "next";
import { getListById, updateList } from "../../../db/list";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (!["GET", "PATCH"].includes(req.method)) {
      res.status(405).end();
      resolve();
    }

    if (req.method === "GET") {
      try {
        const { id } = req.query;
        if (!id) {
          res.status(400).json({ error: "Missing list id" });
          resolve();
        }
        const list = await getListById(id as string);
        res.status(200).json(list);
        resolve();
      } catch (e) {
        reject(e);
      }
    }

    if (req.method === "PATCH") {
      const { title, items, categories, language } = req.body;
      const { id } = req.query;

      if (!title && !items.length && !categories.length && !language) {
        res
          .status(400)
          .json({ error: "Body must contain a valid update option" });
        resolve();
      }

      try {
        const result = await updateList(id as string, {
          title,
          items,
          categories,
          language,
        });
        res.status(200).json(result);
        resolve();
      } catch (e) {
        reject(e);
      }
    }

    resolve();
  });
}
