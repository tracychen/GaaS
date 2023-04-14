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
      throw Error("'gateId' and 'address' are required in request body");
    }
    const gateStruct = await gaasContract.getGate(gateId);
    const config = Buffer.from(gateStruct.configHash, "base64").toString(
      "binary"
    );
    const gate = JSON.parse(config) as Gate;
    // TODO: evaluate and supply evaluation result hash using gate
    const evaluationHash = "";
    const tx = await gaasContract.completeEvaluation(
      gateId,
      address,
      evaluationHash
    );
    const receipt = await tx.wait(3);
    console.debug("Tx receipt", receipt);
    const abi = [
      "event EvaluationCompleted(address evaluatedAddress, uint256 gateId)",
    ];
    const iface = new utils.Interface(abi);
    const logDescriptions = receipt.logs.map((log) => iface.parseLog(log));
    if (logDescriptions.length === 0) {
      throw new Error("No 'EvaluationCompleted' event emitted");
    }
    res.status(201);
  } else {
    throw Error("Only POST requests are supported");
  }
}
