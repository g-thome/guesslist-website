import { NextApiRequest, NextApiResponse } from "next";
import { createList, getListByTitle, getListsByAuthor } from "../../db/list";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (!["GET", "POST"].includes(req.method)) {
      res.status(405).end();
      resolve();
    }

    try {
      if (req.method === "POST") {
        const { authorId, title, categories, items, language } = JSON.parse(
          req.body
        );
        const { id } = await createList(authorId, {
          title,
          categories,
          items,
          language,
        });
        res.status(200).json({ id });
        resolve();
      }

      if (req.method === "GET") {
        const { title, authorId } = req.query;

        if (!title && !authorId) {
          res
            .status(400)
            .json({ error: "you need to pass either list title of authorId" });
        }

        if (title) {
          const list = await getListByTitle(title as string);
          res.status(200).json(list);
          resolve();
        }

        if (authorId) {
          const list = await getListsByAuthor(authorId as string);
          res.status(200).json(list);
          resolve();
        }
      }
    } catch (e) {
      reject(e);
    }

    resolve();
  });
}
