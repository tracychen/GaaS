export interface CreateGateInputs {
  gate: any;
  abi: any;
}

export const createGate = async (
  objectWithData: CreateGateInputs,
  callback: (arg: boolean) => void
) => {
  const resp = await fetch("/api/gate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectWithData),
  });
  console.log("response: ");
  const parsedResp = await resp.json();
  console.log(parsedResp);
  console.log(`gateId: ${parsedResp.gateId}`);
  callback(false);
  return parsedResp.gateId;
};
