import { NextApiRequest, NextApiResponse } from "next";
import { createDraft } from "src/db/list";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (req.method !== "POST") {
      res.status(405).end();
      resolve();
    }

    try {
      const { authorId } = req.body;

      if (!authorId) {
        res.status(400).json({ error: "authorId missing in request body" });
        resolve();
      }

      const { id } = await createDraft(authorId);
      res.status(200).json({ id });
      resolve();
    } catch (e) {
      reject(e);
    }

    resolve();
  });
}
