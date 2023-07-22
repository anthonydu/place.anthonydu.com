import { PropsWithChildren, forwardRef } from "react";

const Modal = forwardRef<HTMLDialogElement, PropsWithChildren>(
  ({ children }, ref) => {
    return (
      <dialog className="rounded-lg border bg-white p-10 text-center" ref={ref}>
        {children}
      </dialog>
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
