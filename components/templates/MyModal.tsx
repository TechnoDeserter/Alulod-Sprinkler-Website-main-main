import Modal from "react-modal";
import { twMerge } from "tailwind-merge";

import type useModal from "@/hooks/useModal";

interface MyModalProps {
  useModal: ReturnType<typeof useModal>;
  title?: string;
  children: React.ReactNode;
  className?: string;
  classNameInner?: string;
  classNameContent?: string;
  classNameChildren?: string;
}

const MyModal: React.FC<MyModalProps> = ({
  useModal,
  title,
  children,
  className,
  classNameContent,
  classNameChildren,
}) => {
  return (
    <Modal
      isOpen={useModal.isOpen}
      ariaHideApp={false}
      className={twMerge(" inset-0 t-zinc-600", className)}
      onRequestClose={useModal.close}
      // style={customStyles}
    >
      {/* MAIN CONTENT */}
      <div
        className={twMerge(
          "absolute w-72 drop-shadow-lg shadow-lg bg-modal_bg rounded-xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2",
          classNameContent
        )}
      >
        {title && (
          <div className="rounded-t-xl bg-header_modal py-1">
            <p className="t-modal_t t46c">{title}</p>
          </div>
        )}
        <div className={twMerge("px-3 py-5", classNameChildren)}>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
