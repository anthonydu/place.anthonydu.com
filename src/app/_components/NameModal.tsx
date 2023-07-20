import { Dispatch, RefObject, SetStateAction, forwardRef } from "react";
import Modal from "./Modal";

const NameModal = forwardRef<HTMLDialogElement, any>((props, ref) => {
  const {
    userName,
    setUserName,
  }: {
    userName: string;
    setUserName: Dispatch<SetStateAction<string>>;
  } = props;

  return (
    <Modal ref={ref}>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(e) => e.preventDefault()}
        autoComplete="on"
      >
        <label htmlFor="name">
          What is your name?
          <br />
          如何稱呼您？
        </label>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (e.currentTarget.nextSibling?.nodeName === "P") {
              e.currentTarget.nextSibling?.remove();
            }
          }}
          className="invalid:border-red rounded border px-1 text-2xl"
          autoFocus
        />
        <button
          className="rounded border px-2 transition-all hover:border-black"
          type="submit"
          onClick={(e) => {
            if (userName !== "") {
              (ref as RefObject<HTMLDialogElement>).current?.close();
            } else if (e.currentTarget.previousSibling?.nodeName !== "P") {
              (
                e.currentTarget.previousSibling as HTMLElement
              ).style.borderColor = "red";
              const p = document.createElement("p");
              p.innerHTML = "Name cannot be empty.";
              p.style.color = "red";
              p.style.fontSize = "small";
              p.style.margin = "-0.5rem 0";
              e.currentTarget.previousSibling?.after(p);
            }
          }}
        >
          Start Placing
        </button>
      </form>
    </Modal>
  );
});

NameModal.displayName = "NameModal";

export default NameModal;
