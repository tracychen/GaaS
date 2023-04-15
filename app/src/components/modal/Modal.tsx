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
        // IMPORTANT: the Rainbow provider adds the data-rk attribute to a div that
        // wraps all child components underneath so that the Rainbow CSS file can
        // target it, but the Dialog component does some funky stuff to create a modal
        // div outside of that div's context. Therefore, we must add the data-rk
        // attribute here manually in order for the Rainbow CSS to apply.
        data-rk
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
