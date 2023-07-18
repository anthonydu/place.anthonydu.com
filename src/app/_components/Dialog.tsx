import { forwardRef } from "react";

const Dialog = forwardRef<HTMLDialogElement>((_props, ref) => {
  return (
    <dialog
      className="flex h-48 w-80 flex-col items-center justify-center rounded-lg border bg-white shadow"
      ref={ref}
    >
      <p className="text-center">
        Connection failed!
        <br />
        Please check your internet
        <br />
        connection and try again.
      </p>
    </dialog>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
