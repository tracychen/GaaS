import { Gate } from "@/types/gate";
import { getGaaSContract } from "@/utils/provider";
import { utils } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

const gaasContract = getGaaSContract("mumbai");

type RequestBody = {
  gateId: string;
  address: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Submit evaluation result on-chain
    const { gateId, address } = req.body as RequestBody;
    if (!gateId || !address) {
      return res.status(400).json({error: "'gateId' and 'address' are required in request body"})
    }
    const gateStruct = await gaasContract.gates(gateId);
    const config = Buffer.from(gateStruct.configHash, "base64").toString(
      "binary"
    );
    const gate = JSON.parse(config) as Gate;
    // TODO: evaluate and supply evaluation result hash using gate
    const evaluationHash = "random";
    const tx = await gaasContract.completeEvaluation(
      gateId,
      address,
      evaluationHash
    );
    const receipt = await tx.wait(3);
    console.debug("Tx receipt", receipt);
    
    return res.status(201);
  } else {
    return res.status(405).json({ error: "Only POST requests are supported" })
  }
}
