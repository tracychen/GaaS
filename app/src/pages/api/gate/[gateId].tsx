import { Gate } from "@/types/gate";
import { getGaaSContract } from "@/utils/provider";
import { NextApiRequest, NextApiResponse } from "next";

// TODO: allow switching between mumbai/scrollalpha
const gaasContract = getGaaSContract("mumbai");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Get gate by gateId
    const { gateId } = req.query;
    if (!gateId || typeof gateId !== "string") {
      throw Error("'gateId' are required in request body and must be string");
    }
    const gateStruct = await gaasContract.getGate(gateId);
    const gateString = Buffer.from(gateStruct.configHash, "base64").toString(
      "binary"
    );
    const gate = JSON.parse(gateString) as Gate;
    res.status(200).json({ date: gate });
  } else {
    throw Error("Only GET requests are supported");
  }
}
