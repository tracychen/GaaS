import { Gate } from "@/types/gate";
import { getGaaSContract } from "@/utils/provider";
import { NextApiRequest, NextApiResponse } from "next";

import { utils } from "ethers";

// TODO: allow switching between mumbai/scrollalpha
const gaasContract = getGaaSContract("mumbai");

type RequestBody = {
  gate: Gate;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Create gate on-chain
    const { gate } = req.body as RequestBody;
    if (!gate) {
      throw Error("'gate' is required in request body");
    }
    const gateString = JSON.stringify(gate);
    const configHash = Buffer.from(gateString).toString("base64");

    const tx = await gaasContract.createGate(configHash);
    const receipt = await tx.wait(3);
    console.debug("Tx receipt", receipt);

    const abi = ["event GateCreated(address creator, uint256 gateId)"];
    const iface = new utils.Interface(abi);
    const logDescriptions = receipt.logs.map((log) => iface.parseLog(log));
    if (logDescriptions.length === 0) {
      throw new Error("No 'GateCreated' event emitted");
    }
    res.status(201);
  } else {
    throw Error("Only POST requests are supported");
  }
}
