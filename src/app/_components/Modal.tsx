import { forwardRef } from "react";

const Modal = forwardRef<HTMLDialogElement, any>((props, ref) => {
  return (
    <dialog className="rounded-lg border bg-white p-10 text-center" ref={ref}>
      {props.children}
    </dialog>
  );
});

Modal.displayName = "Modal";

export default Modal;
