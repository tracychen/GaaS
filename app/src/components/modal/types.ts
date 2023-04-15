export enum ModalType {
  ACCESS_GATE = "ACCESS_GATE",
}

export interface AccessGateModalProps {
  gateId: string;
}

export type GlobalModalContextType = {
  showModal: (modalType: ModalType, modalProps?: any) => void;
  hideModal: () => void;
  modalState: {
    modalType: ModalType | null;
    modalProps: any | null;
  };
};
