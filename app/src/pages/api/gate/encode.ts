import { NextApiRequest, NextApiResponse } from "next";
import { Gate } from "../../../types/gate";

type RequestBody = {
  gate: Gate;
};
type Response = {
  configHash: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === "POST") {
    const { gate } = req.body as RequestBody;
    if (!gate) {
      throw Error("'gate' is required in request body");
    }
    const gateString = JSON.stringify(gate);
    const configHash = Buffer.from(gateString).toString("base64");
    res.status(200).json({ configHash });
  } else {
    throw Error("Only POST requests are supported");
  }
}
