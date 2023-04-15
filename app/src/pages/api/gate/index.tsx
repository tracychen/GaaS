import { Gate } from "@/types/gate";
import { insertABIIntoDB } from "@/utils/planetscale";
import { getGaaSContract } from "@/utils/provider";
import { BigNumber, ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

// TODO: allow switching between mumbai/scrollalpha
const gaasContract = getGaaSContract("mumbai");

type RequestBody = {
  gate: Gate;
  abi: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Create gate on-chain
    const { gate, abi } = req.body as RequestBody;
    if (!gate || !abi) {
      return res
        .status(400)
        .json({ error: "'gate' and 'abi' is required in request body" });
    }
    const gateString = JSON.stringify(gate);
    const configHash = Buffer.from(gateString).toString("base64");

    const tx = await gaasContract.createGate(configHash);
    const receipt = await tx.wait(3);

    // NOTE: remove the second event for non-Polygon chain
    const partialGaaSABI = [
      "event GateCreated(address creator, uint256 gateId)",
      // seems like Polygon has another event that's invoked automatically that's not part of the contract
      // ref: https://mumbai.polygonscan.com/tx/0x38290bd7173c4f71c7b04e0d27b915bb03cac06c008ad8322999baab8d9ab996#eventlog
      // ref: https://www.4byte.directory/event-signatures/?page=237&sort=id
      "event LogFeeTransfer(address indexed token, address indexed from, address indexed to, uint256 amount, uint256 input1, uint256 input2, uint256 output1, uint256 output2)",
    ];
    const iface = new ethers.utils.Interface(partialGaaSABI);
    const logDescriptions = receipt.logs.map((log) => iface.parseLog(log));

    const gateId = (
      logDescriptions?.[0].args?.["gateId"] as BigNumber
    ).toNumber();

    // dump ABI into DB for later querying
    await insertABIIntoDB(gateId, abi);

    return res.status(201).json({ gateId: gateId });
  } else {
    return res.status(405).json({ error: "Only POST requests are supported" });
  }
}
