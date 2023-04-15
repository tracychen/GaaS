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

export const parseEvents = (abiJSON: string): Event[] => {
  const abi = JSON.parse(abiJSON);
  const events = abi.filter(
    (event: any) => event.type === "event" || event.type === "function"
  );
  console.log(events);

  const eventOptions = [];
  for (const event of events) {
    for (const inputField of event.inputs) {
      if (inputField.type === "address") {
        eventOptions.push({
          name: event.name,
          field: inputField.name,
          type: event.type,
        });
      }
    }
  }

  return eventOptions;
};
