const baseUrl = "https://ah2kgrbwj5crpcfip5qluoiyby.multibaas.com";

export const listWalletTransactions = async (
  chain = "ethereum",
  walletAddress: string,
  query?: {
    hash?: string;
    nonce?: string;
    status?: string;
    limit?: string;
    offset?: string;
  }
) => {
  const params = new URLSearchParams({
    ...(query?.hash && { hash: query?.hash }),
    ...(query?.nonce && { nonce: query?.nonce }),
    ...(query?.status && { status: query?.status }),
    ...(query?.limit && { limit: query?.limit }),
    ...(query?.offset && { offset: query?.offset }),
  }).toString();

  const url = `${baseUrl}/api/v0/chains/${chain}/txm/${walletAddress}?${params}`;
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.MULTIBAAS_API_KEY}`,
    },
  });

  const data = await resp.text();
  console.log(data);
  return data;
};

export const executeEventQuery = async (queryName: string) => {
  const query = new URLSearchParams({ offset: "0", limit: "0" }).toString();

  const url = `${baseUrl}/api/v0/queries/${queryName}/results?${query}`;
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.MULTIBAAS_API_KEY}`,
    },
  });

  const data = await resp.text();
  console.log(data);
  return data;
};

export const upsertEventQuery = async (
  eventName = "Transfer(address,address,uint256)",
  contractAddress: string
) => {
  const eventQuery = "TestTransferEventQuery";
  const url = `${baseUrl}/api/v0/queries/${eventQuery}`;
  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MULTIBAAS_API_KEY}`,
    },
    body: JSON.stringify({
      events: [
        {
          eventName: eventName,
          select: [
            {
              alias: "account",
              type: "input",
              name: "from",
              inputIndex: 0,
            },
          ],
          filter: {
            rule: "And",
            children: [
              {
                operator: "Equal",
                value: contractAddress,
                fieldType: "contract_address",
              },
            ],
          },
        },
      ],
    }),
  });

  const data = await resp.json();
  console.log(data);
  return data;
};
