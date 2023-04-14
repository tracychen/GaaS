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
      return res
        .status(400)
        .json({ error: "'gateId' must be a positive integer" });
    }
    if (!Number.isInteger(Number(gateId))) {
      return res
        .status(400)
        .json({ error: "'gateId' must be a positive integer" });
    }
    const gaasContract = getGaaSContract("mumbai");
    const gateStruct = await gaasContract.gates(gateId);
    if (!gateStruct.configHash) {
      return res.status(404).json({ error: "Gate not found" });
    }
    const gateString = Buffer.from(gateStruct.configHash, "base64").toString(
      "binary"
    );
    const gate = JSON.parse(gateString) as Gate;
    return res.status(200).json({ data: gate });
  } else {
    throw Error("Only GET requests are supported");
  }
}
