import { toast } from "react-hot-toast";
import AccessGateView from "../gate/AccessGateView";
import { useGlobalModalContext } from "./GlobalModalContext";
import Modal from "./Modal";
import type { AccessGateModalProps } from "./types";
import { ModalType } from "./types";

const AccessGateModal = () => {
  const { hideModal, modalState } = useGlobalModalContext();
  const { modalProps, modalType } = modalState;
  const { gateId }: AccessGateModalProps = modalProps;

  return (
    // Do not define onClose here to prevent default closing behavior of the modal
    <Modal isOpen={modalType === ModalType.ACCESS_GATE} onClose={() => {}}>
      <AccessGateView
        gateId={gateId}
        onGoToNext={() => {
          toast.success("gate passed!");
          hideModal();
        }}
      />
    </Modal>
  );
};

export default AccessGateModal;
