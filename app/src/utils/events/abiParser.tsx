//   {
//     "anonymous": false,
//     "inputs": [{ "indexed": false, "name": "_user", "type": "address" }],
//     "name": "AddedBlackList",
//     "type": "event"
//   },

import { Event } from "@/app/page";

// interface Event {
//     name: string;
//     field: string;
//     icon?: JSX.Element;
//   }

export const parseEvents = (abiJSON: string): Event => {
  const abi = JSON.parse(abiJSON);
  const events = abi.filter((event: any) => event.type === "event");
  console.log(events);
  return events.map((event: any) => {
    for (const input of event.inputs) {
    }
    return {
      name: event.name,
    };
  });
};
