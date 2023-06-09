import * as PushAPI from "@pushprotocol/restapi";
import { Wallet } from "ethers";
import { Gate } from "@/types/gate";
import { EvaluationResult } from "@/pages/api/evaluation";

const privateKey = process.env.PUSH_PRIVATE_KEY!;
const Pkey = `0x${privateKey}`;
const _signer = new Wallet(Pkey);

export const sendNotificationGateCreated = async (
  gateId: number,
  gate: Gate
) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      senderType: 1, // wallet
      signer: _signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `Gate Created`,
        body: JSON.stringify({
          gateId,
          gate,
        }),
      },
      payload: {
        title: `Gate Created`,
        body: JSON.stringify({
          gateId,
          gate,
        }),
        cta: "",
        img: "",
      },
      channel: "eip155:5:0xC4a88E54fBe997B5714F91022324952c3679baA5", // your channel address
    });
  } catch (err) {
    console.error("Error: ", err);
  }
};

export const sendNotificationEvaluationComplete = async (
  address: string,
  evaluationResult: EvaluationResult
) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      senderType: 1, // wallet
      signer: _signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `Gate Evaluation Complete`,
        body: JSON.stringify({
          address,
          evaluationResult,
        }),
      },
      payload: {
        title: `Gate Evaluation Complete`,
        body: JSON.stringify({
          address,
          evaluationResult,
        }),
        cta: "",
        img: "",
      },
      channel: "eip155:5:0xC4a88E54fBe997B5714F91022324952c3679baA5", // your channel address
    });
  } catch (err) {
    console.error("Error: ", err);
  }
};
