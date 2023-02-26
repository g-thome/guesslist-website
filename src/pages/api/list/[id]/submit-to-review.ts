import { NextApiRequest, NextApiResponse } from "next";
import { submitToReview } from "src/db/list";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (req.method !== "PATCH") {
      res.status(405).end();
      return resolve();
    }

    try {
      await submitToReview(req.query.id as string);
      res.status(200).send("");
      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
}
