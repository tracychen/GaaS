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
      hi {gateId}
    </Modal>
  );
};

export default AccessGateModal;
