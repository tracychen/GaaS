import { Button } from "@/ui/Button";
import { Text } from "@/ui/Text";
import { useGlobalModalContext } from "./GlobalModalContext";
import Modal from "./Modal";
import { ModalType } from "./GlobalModal";

export interface GatingModalProps {
    title?: string;
    description?: string;
    // confirmButton: { text: string; onClick: () => void };
    // cancelButton: { text: string; onClick: () => void };
    // icon?: "caution" | "deletion" | "";
  }


const GatingModal = () => {
  const { hideModal, modalState } = useGlobalModalContext();
  const { modalProps, modalType } = modalState;
  const {
    title,
    description,
    // confirmButton,
    // cancelButton,
    // icon,
  }: GatingModalProps = modalProps;

  return (
    <>
      <Modal isOpen={modalType === ModalType.GATE} onClose={hideModal}>
        <div className={"rounded-brand bg-white p-8 sm:w-[500px]"}>
          {/* {icon === "caution" && (
            <>
              <div className="mb-3 -mt-4 text-center text-[40px]">😬</div>
            </>
          )}
          {icon === "deletion" && (
            <>
              <div className="mb-3 -mt-4 text-center text-[40px]">⛔️</div>
            </>
          )} */}

          <div className="mb-8 flex flex-col gap-y-4 text-center">
            <Text variant={"semibold"}>{title}</Text>
            <Text variant={"secondary"}>{description}</Text>
          </div>

          <div className="flex flex-wrap-reverse justify-end gap-2">
            <Button
              variant={"tertiary"}
              onClick={async () => {
                // await cancelButton.onClick();
                hideModal();
              }}
              size="modal"
            >
              {/* {cancelButton.text} */}
              cancel
            </Button>
            <Button
              variant={"primary"}
              onClick={async () => {
                // await confirmButton.onClick();
                hideModal();
              }}
              size="modal"
            >
              {/* {confirmButton.text} */}
              confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GatingModal;
