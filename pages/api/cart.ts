import type { NextApiRequest, NextApiResponse } from "next";

let cart = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(cart);
  } else if (req.method === "PUT") {
    cart = req.body;
    return res.status(200).json(cart);
  } else {
    return res.status(404).end();
  }
}
