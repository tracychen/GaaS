import { Gate } from "@/types/gate";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  configHash: string;
};
type Response = {
  gate: Gate;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const { configHash } = req.body as RequestBody;
    if (!configHash) {
      throw Error("'configHash' is required in request body");
    }
    const config = Buffer.from(configHash, "base64").toString("binary");
    const gate = JSON.parse(config) as Gate;
    res.status(200).json({ gate });
  } else {
    throw Error("Only POST requests are supported");
  }
}
