import { forwardRef } from "react";

const Dialog = forwardRef<
  HTMLDialogElement,
  React.HTMLProps<HTMLDialogElement>
>((props, ref) => {
  return (
    <dialog className="rounded-lg border bg-white p-10 text-center" ref={ref}>
      <div className="flex flex-col items-center gap-2">{props.children}</div>
    </dialog>
  );
});

Dialog.displayName = "Dialog";

export default Dialog;
