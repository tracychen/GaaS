"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import AccessGateModal from "./AccessGateModal";
import { GlobalModalContext } from "./GlobalModalContext";
import { ModalType } from "./types";

const ModalComponents: any = {
  [ModalType.ACCESS_GATE]: AccessGateModal,
};

export const GlobalModal = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<any>({});
  const { modalType, modalProps } = modalState;

  const showModal = (type: ModalType, props: any = {}) => {
    setModalState({
      ...modalState,
      modalType: type,
      modalProps: props,
    });
  };

  const hideModal = () => {
    setModalState({
      ...modalState,
      modalType: null,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    const ModalComponent = ModalComponents[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }
    return <ModalComponent id="global-modal" {...modalProps} />;
  };

  return (
    <GlobalModalContext.Provider value={{ modalState, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </GlobalModalContext.Provider>
  );
};
