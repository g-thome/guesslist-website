import { NextApiRequest, NextApiResponse } from "next";
import {getDraftsFromUser} from "src/db/list";

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
            const drafts = await getDraftsFromUser(req.query.id as string);
            res.status(200).json({ drafts });
            return resolve();
        } catch (e) {
            reject(e);
        }
    });
}
