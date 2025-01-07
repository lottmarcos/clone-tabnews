import { NextApiRequest, NextApiResponse } from "next";
import { query } from "infra/database";

const status = async (req: NextApiRequest, res: NextApiResponse) => {
  const { result } = await query({ text: "SELECT 1 + 1 as sum;" });
  console.log(result);
  res.status(200).json({ status: "ok" });
};

export default status;
