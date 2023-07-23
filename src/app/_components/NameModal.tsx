import { ComponentProps, useState } from "react";
import Modal from "./Modal";
import AddToHomeScreen from "./AddToHomeScreen";

export default function NameModal({
  userName,
  setUserName,
  userAgent,
  ...props
}: {
  userName: string;
  setUserName: (userName: string) => void;
  userAgent: string | null;
  props?: ComponentProps<"div">;
}) {
  const [naming, setNaming] = useState(true);

  return (
    <>
      <Modal className={naming ? "" : "hidden"} {...props}>
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
            className="rounded-md border px-3 py-1 transition-all hover:bg-gray-100"
            type="submit"
            onClick={(e) => {
              if (userName !== "") {
                setNaming(false);
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
      {userAgent?.includes("iPhone") || userAgent?.includes("iPad") ? (
        <AddToHomeScreen className={naming ? "" : "hidden"}></AddToHomeScreen>
      ) : null}
    </>
  );
}
