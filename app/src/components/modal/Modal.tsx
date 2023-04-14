import { Dialog } from "@headlessui/react";
import type { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="relative z-[100] h-full w-full"
      >
        <div className="fixed inset-0 bg-[#00000099]" aria-hidden="true" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel>{children}</Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
