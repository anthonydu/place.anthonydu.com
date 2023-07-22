import { useState } from "react";

const colors = [
  "#6d001a",
  "#be0039",
  "#ff4500",
  "#ffa800",
  "#ffd635",
  "#fff8b8",
  "#00a368",
  "#00cc78",
  "#7eed56",
  "#00756f",
  "#009eaa",
  "#00ccc0",
  "#2450a4",
  "#3690ea",
  "#51e9f4",
  "#493ac1",
  "#6a5cff",
  "#94b3ff",
  "#811e9f",
  "#b44ac0",
  "#e4abff",
  "#de107f",
  "#ff3881",
  "#ff99aa",
  "#6d482f",
  "#9c6926",
  "#ffb470",
  "#000000",
  "#515252",
  "#898d90",
  "#d4d7d9",
  "#ffffff",
];

export default function ColorPicker({
  onPick,
}: {
  onPick: (color: number) => Promise<void>;
}) {
  const [picking, setPicking] = useState(false);

  return (
    <>
      <button
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white px-10 py-1 font-semibold shadow-md`}
        onClick={() => setPicking(true)}
      >
        Place&nbsp;a&nbsp;Pixel
      </button>
      <div
        className={`fixed bottom-0 left-0 flex w-screen flex-col justify-center space-y-5 bg-white p-5 shadow-2xl transition-all ${
          picking
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-[100px] opacity-0"
        }`}
      >
        <ul className="grid grid-cols-4 justify-center gap-2 sm:grid-cols-8 md:grid-cols-[repeat(16,1fr)] 2xl:grid-cols-[repeat(32,minmax(0,4rem))]">
          {colors.map((color) => {
            return (
              <li
                className={`h-8 w-auto cursor-pointer border`}
                style={{ backgroundColor: color }}
                key={color}
                onClick={() => {
                  onPick(parseInt(color.split("#")[1], 16));
                  setPicking(false);
                }}
              ></li>
            );
          })}
        </ul>
        <button
          className="mx-auto w-fit rounded-full border border-black px-10 py-1 font-semibold"
          onClick={() => setPicking(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
