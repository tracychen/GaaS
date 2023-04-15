import { createContext, useContext } from "react";
import type { GlobalModalContextType } from "./types";

const initalState: GlobalModalContextType = {
  showModal: () => {},
  hideModal: () => {},
  modalState: { modalType: null, modalProps: {} },
};

export const GlobalModalContext = createContext(initalState);

export const useGlobalModalContext = () => useContext(GlobalModalContext);
